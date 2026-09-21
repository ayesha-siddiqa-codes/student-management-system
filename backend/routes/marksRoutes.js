const express = require("express");
const Marks = require("../models/Marks");

const router = express.Router();

// Get marks
router.get("/", async (req, res) => {
    try {
        const marks = await Marks.find()
            .populate("student", "name email");

        res.json(marks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Add marks
router.post("/", async (req, res) => {
    try {
        const marks = new Marks(req.body);

        const savedMarks = await marks.save();

        res.status(201).json(savedMarks);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;