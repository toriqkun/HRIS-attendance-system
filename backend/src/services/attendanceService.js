const prisma = require('../utils/prisma');
const getAttendanceStatus = require('../utils/attendanceStatus');

const getAllEmployees = async () => {
  return await prisma.employee.findMany();
};

const createAttendance = async (data) => {
  const employeeId = parseInt(data.employee_id);
  const type = data.type;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId }
  });
  if (!employee) {
    throw new Error('Employee not found');
  }

  const existingRecords = await prisma.attendance.findMany({
    where: {
      employeeId,
      timestamp: {
        gte: today,
        lt: tomorrow,
      }
    }
  });
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

  return await prisma.attendance.create({
    data: {
      employeeId,
      type,
    }
  });
};

const getAttendanceReport = async (startDate, endDate) => {
  const queryStartDate = startDate ? new Date(startDate) : undefined;
  const queryEndDate = endDate ? new Date(endDate) : undefined;

  const attendanceRecords = await prisma.attendance.findMany({
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
    check_in: item.check_in ? item.check_in.toTimeString().slice(0, 5) : null,
    check_out: item.check_out ? item.check_out.toTimeString().slice(0, 5) : null,
    status: getAttendanceStatus(item.check_in, item.check_out)
  }));
};

const getDashboardSummary = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const totalEmployees = await prisma.employee.count();
  
  const todayAttendance = await prisma.attendance.findMany({
    where: {
      timestamp: {
        gte: today,
        lt: tomorrow,
      }
    }
  });

  const report = {};
  todayAttendance.forEach(record => {
    const key = record.employeeId;
    if (!report[key]) {
      report[key] = { check_in: null, check_out: null };
    }
    if (record.type === 'IN') report[key].check_in = record.timestamp;
    if (record.type === 'OUT') report[key].check_out = record.timestamp;
  });

  const summary = {
    totalEmployee: totalEmployees,
    presentToday: Object.keys(report).length,
    late: 0,
    incomplete: 0
  };

  Object.values(report).forEach(item => {
    const status = getAttendanceStatus(item.check_in, item.check_out);
    if (status === 'Late') summary.late++;
    if (status === 'Incomplete') summary.incomplete++;
  });

  return summary;
};

module.exports = {
  getAllEmployees,
  createAttendance,
  getAttendanceReport,
  getDashboardSummary
};
