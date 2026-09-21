const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

// =====================================================
// ADMIN LOGIN
// =====================================================

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find admin
        const admin = await Admin.findOne({
            email: email.toLowerCase().trim()
        });

        // Admin not found
        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        if (admin.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Successful login
        res.json({
            message: "Login successful",
            admin: {
                id: admin._id,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error during login"
        });
    }
});

module.exports = router;