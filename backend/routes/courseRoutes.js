const express = require("express");
const router = express.Router();

const Course = require("../models/Course");

// GET all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        res.json(courses);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
});


// GET single course
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(course);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch course"
        });
    }
});


// ADD course
router.post("/", async (req, res) => {
    try {
        const { name, code, duration, department } = req.body;

        const existingCourse = await Course.findOne({ code });

        if (existingCourse) {
            return res.status(400).json({
                message: "Course code already exists"
            });
        }

        const course = new Course({
            name,
            code,
            duration,
            department
        });

        const savedCourse = await course.save();

        res.status(201).json(savedCourse);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add course"
        });
    }
});

// UPDATE course
router.put("/:id", async (req, res) => {

    try {

        const { name, code, duration, department } =
            req.body;

        const course =
            await Course.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    code,
                    duration,
                    department
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(course);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update course"
        });
    }

});
// DELETE course
router.delete("/:id", async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(
            req.params.id
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete course"
        });
    }
});


module.exports = router;