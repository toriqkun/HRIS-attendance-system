const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/employees', attendanceController.getEmployees);
router.post('/', attendanceController.recordAttendance);
router.get('/report', attendanceController.getReport);
router.get('/summary', attendanceController.getSummary);

module.exports = router;
