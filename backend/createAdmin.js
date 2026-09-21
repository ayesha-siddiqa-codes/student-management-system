const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("./models/Admin");

const createAdmin = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const existingAdmin =
            await Admin.findOne({
                email: "admin@gmail.com"
            });

        if (existingAdmin) {

            console.log("Admin already exists");

            process.exit();

        }


        const admin =
            new Admin({

                email: "admin@gmail.com",

                password: "admin123"

            });


        await admin.save();


        console.log(
            "Admin created successfully!"
        );

        console.log(
            "Email: admin@gmail.com"
        );

        console.log(
            "Password: admin123"
        );


        process.exit();

    } catch (error) {

        console.error(
            "Error creating admin:",
            error
        );

        process.exit(1);
    }
};


createAdmin();