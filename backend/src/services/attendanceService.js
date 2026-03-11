const prisma = require('../utils/prisma');

const getAllEmployees = async () => {
  return await prisma.employee.findMany();
};

const createAttendance = async (data) => {
  // Logic will be refined in Step 5: Business Logic
  return await prisma.attendance.create({
    data: {
      employeeId: parseInt(data.employee_id),
      type: data.type,
    }
  });
};

const getAttendanceReport = async (startDate, endDate) => {
  return await prisma.attendance.findMany({
    where: {
      timestamp: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      }
    },
    include: {
      employee: true
    }
  });
};

module.exports = {
  getAllEmployees,
  createAttendance,
  getAttendanceReport
};
