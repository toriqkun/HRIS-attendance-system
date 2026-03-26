const employeeRepository = require('../repositories/employeeRepository');
const attendanceRepository = require('../repositories/attendanceRepository');
const getAttendanceStatus = require('../utils/attendanceStatus');

const getAllEmployees = async () => {
  return await employeeRepository.getAll();
};

const createAttendance = async (data) => {
  const employeeId = parseInt(data.employee_id);
  const type = data.type;
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const employee = await employeeRepository.getById(employeeId);
  if (!employee) {
    throw new Error('Employee not found');
  }

  const existingRecords = await attendanceRepository.findByEmployeeInDateRange(employeeId, today, tomorrow);

  const hasIn = existingRecords.some(r => r.type === 'IN');
  const hasOut = existingRecords.some(r => r.type === 'OUT');

  if (type === 'IN') {
    if (hasIn) {
      const error = new Error('You have already checked in today');
      error.status = 400;
      throw error;
    }
  } else if (type === 'OUT') {
    if (!hasIn) {
      const error = new Error('You must check in before checking out');
      error.status = 400;
      throw error;
    }
    if (hasOut) {
      const error = new Error('You have already checked out today');
      error.status = 400;
      throw error;
    }
  }

  const created = await attendanceRepository.create({
    employeeId,
    type,
    timestamp: now,
  });

  return {
    ...created,
    formatted_time: created.timestamp.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5)
  };
};

const getAttendanceReport = async (startDate, endDate) => {
  const queryStartDate = startDate ? new Date(startDate) : undefined;
  const queryEndDate = endDate ? new Date(endDate) : undefined;

  const attendanceRecords = await attendanceRepository.findMany({
    where: {
      timestamp: {
        gte: queryStartDate,
        lte: queryEndDate,
      }
    },
    include: {
      employee: true
    },
    orderBy: {
      timestamp: 'asc'
    }
  });

  const reportMap = {};

  attendanceRecords.forEach(record => {
    const date = record.timestamp.toISOString().split('T')[0];
    const key = `${date}_${record.employeeId}`;

    if (!reportMap[key]) {
      reportMap[key] = {
        employee_id: record.employeeId,
        name: record.employee.name,
        date: date,
        check_in: null,
        check_out: null,
      };
    }

    if (record.type === 'IN') {
      reportMap[key].check_in = record.timestamp;
    } else if (record.type === 'OUT') {
      reportMap[key].check_out = record.timestamp;
    }
  });

  return Object.values(reportMap).map(item => ({
    ...item,
    check_in: item.check_in ? item.check_in.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5) : null,
    check_out: item.check_out ? item.check_out.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5) : null,
    status: getAttendanceStatus(item.check_in, item.check_out)
  }));
};

const getDashboardSummary = async () => {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const totalEmployees = await employeeRepository.count();
  
  const todayAttendance = await attendanceRepository.findTodayAttendance(today, tomorrow);
  const todayReport = {};
  todayAttendance.forEach(record => {
    const key = record.employeeId;
    if (!todayReport[key]) todayReport[key] = { check_in: null, check_out: null };
    if (record.type === 'IN') todayReport[key].check_in = record.timestamp;
    if (record.type === 'OUT') todayReport[key].check_out = record.timestamp;
  });

  const summary = {
    totalEmployee: totalEmployees,
    presentToday: Object.keys(todayReport).length,
    late: 0,
    incomplete: 0,
    weeklyEfficiency: []
  };

  Object.values(todayReport).forEach(item => {
    const status = getAttendanceStatus(item.check_in, item.check_out);
    if (status === 'Late') summary.late++;
    if (status === 'Incomplete') summary.incomplete++;
  });

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const pastAttendance = await attendanceRepository.findAttendanceInRange(sevenDaysAgo, tomorrow, 'IN');
  const efficiencyMap = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    efficiencyMap[dateStr] = new Set();
  }

  pastAttendance.forEach(record => {
    const dateStr = record.timestamp.toISOString().split('T')[0];
    if (efficiencyMap[dateStr]) {
      efficiencyMap[dateStr].add(record.employeeId);
    }
  });

  summary.weeklyEfficiency = Object.keys(efficiencyMap).sort().map(date => {
    const presentCount = efficiencyMap[date].size;
    return totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;
  });

  return summary;
};

module.exports = {
  getAllEmployees,
  createAttendance,
  getAttendanceReport,
  getDashboardSummary
};

