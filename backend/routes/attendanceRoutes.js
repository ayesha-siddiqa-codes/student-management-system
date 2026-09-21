const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// Get attendance
router.get("/", async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("student", "name email");

        res.json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Add attendance
router.post("/", async (req, res) => {
    try {
        const attendance = new Attendance(req.body);

        const savedAttendance = await attendance.save();

        res.status(201).json(savedAttendance);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;