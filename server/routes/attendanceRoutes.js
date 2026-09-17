const express = require('express');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

const router = express.Router();

// Create Attendance
router.post('/', async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        message: 'Employee, date and status are required',
      });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found',
      });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date,
      status,
    });

    res.status(201).json({
      message: 'Attendance saved successfully',
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

// Get All Attendance
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('employee', 'name department position').sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

module.exports = router;
