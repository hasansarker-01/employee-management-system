const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Create Employee
router.post('/', async(req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            message: 'Employee created successfully',
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

// Get All Employees
router.get('/', async(req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

// Get Single Employee
router.get('/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found',
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

// Update Employee
router.put('/:id', async(req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found',
            });
        }

        res.status(200).json({
            message: 'Employee updated successfully',
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

// Delete Employee
router.delete('/:id', async(req, res) => {
    try {
        console.log('Delete ID:', req.params.id);

        const employee = await Employee.findByIdAndDelete(req.params.id);

        console.log(employee);

        res.status(200).json({
            message: 'Employee deleted successfully',
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

// Update Employee
router.put('/:id', async(req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found',
            });
        }

        res.status(200).json({
            message: 'Employee updated successfully',
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     console.log("Delete ID:", req.params.id);

//     const employee = await Employee.findByIdAndDelete(
//       req.params.id
//     );

//     console.log(employee);

//     res.status(200).json({
//       message: "Employee deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// });

module.exports = router;