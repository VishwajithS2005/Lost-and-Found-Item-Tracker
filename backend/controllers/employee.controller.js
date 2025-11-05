import mongoose from "mongoose";
import Employee from "../models/employee.model.js";

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().exec();
        res.status(200).json({
            "Details": employees,
            "Message": "All Employees fetched successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const empId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(empId)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Employee ID",
                "Success": false
            });
        }
        const employee = await Employee.findById(empId).exec();
        if (!employee) {
            return res.status(404).json({
                "Details": null,
                "Message": "Employee not found",
                "Success": false
            });
        }
        res.status(200).json({
            "Details": employee,
            "Message": "Employee fetched successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const createEmployee = async (req, res) => {
    try {
        const EmployeeData = req.body;
        if (!EmployeeData.name || !EmployeeData.userName || !EmployeeData.password) {
            return res.status(400).json({
                "Details": null,
                "Message": "Missing required fields",
                "Success": false
            });
        }
        const newEmployee = new Employee(EmployeeData);
        const savedEmployee = await newEmployee.save();
        res.status(201).json({
            "Details": savedEmployee,
            "Message": "Employee created successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const empId = req.params.id;
        const updateData = req.body;
        if (!mongoose.Types.ObjectId.isValid(empId)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Employee ID",
                "Success": false
            });
        }
        if (!updateData.name || !updateData.userName || !updateData.password) {
            return res.status(400).json({
                "Details": null,
                "Message": "Missing required fields",
                "Success": false
            });
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(empId, updateData, { new: true }).exec();
        if (!updatedEmployee) {
            return res.status(404).json({
                "Details": null,
                "Message": "Employee not found",
                "Success": false
            });
        }
        res.status(200).json({
            "Details": updatedEmployee,
            "Message": "Employee updated successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const empId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(empId)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Employee ID",
                "Success": false
            });
        }
        const deletedEmployee = await Employee.findByIdAndDelete(empId).exec();
        if (!deletedEmployee) {
            return res.status(404).json({
                "Details": null,
                "Message": "Employee not found",
                "Success": false
            });
        }
        res.status(200).json({
            "Details": deletedEmployee,
            "Message": "Employee deleted successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const loginEmployee = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                "Details": null,
                "Message": "Missing username or password",
                "Success": false
            });
        }
        const employee = await Employee.findOne({ userName: userName, password: password }).exec();
        if (!employee) {
            return res.status(401).json({
                "Details": null,
                "Message": "Invalid credentials",
                "Success": false
            });
        }
        res.status(200).json({
            "Details": employee,
            "Message": "Login successful",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}