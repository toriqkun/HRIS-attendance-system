const prisma = require('../utils/prisma');

const create = async (data) => {
  return await prisma.attendance.create({
    data
  });
};

const findByEmployeeInDateRange = async (employeeId, startDate, endDate) => {
  return await prisma.attendance.findMany({
    where: {
      employeeId: parseInt(employeeId),
      timestamp: {
        gte: startDate,
        lt: endDate,
      }
    }
  });
};

const findMany = async (params = {}) => {
  const { where, include, orderBy } = params;
  return await prisma.attendance.findMany({
    where,
    include,
    orderBy
  });
};

const findTodayAttendance = async (startOfDay, endOfDay) => {
  return await prisma.attendance.findMany({
    where: {
      timestamp: {
        gte: startOfDay,
        lt: endOfDay
      }
    }
  });
};

const findAttendanceInRange = async (startDate, endDate, type) => {
  const where = {
    timestamp: {
      gte: startDate,
      lt: endDate
    }
  };
  if (type) where.type = type;

  return await prisma.attendance.findMany({
    where,
    select: {
      timestamp: true,
      employeeId: true
    }
  });
};

module.exports = {
  create,
  findByEmployeeInDateRange,
  findMany,
  findTodayAttendance,
  findAttendanceInRange
};
