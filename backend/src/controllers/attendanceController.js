const attendanceService = require('../services/attendanceService');

const getEmployees = async (req, res, next) => {
  try {
    const employees = await attendanceService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

const recordAttendance = async (req, res, next) => {
  try {
    const result = await attendanceService.createAttendance(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const report = await attendanceService.getAttendanceReport(startDate, endDate);
    res.json(report);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  recordAttendance,
  getReport
};
