# 🎓 Student Management System

Student Management System is a full-stack web application designed to simplify the management of students, attendance, marks, and courses through a centralized admin dashboard.

The application allows administrators to manage student records, track attendance, manage academic marks, and organize courses. It is built using **HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and Mongoose**.

---

## ✨ Features

### 👨‍🎓 Student Management

* Add new students
* View student records
* Update student information
* Delete student records
* Store student name, email, phone, course, age, and gender

### 📅 Attendance Management

* Record student attendance
* View attendance records
* Track present and absent students
* View daily attendance statistics
* Attendance overview chart

### 📊 Marks Management

* Add student marks
* View academic performance
* Manage marks records
* Calculate average marks
* Display marks statistics

### 📚 Course Management

* Add courses
* View available courses
* Update course information
* Delete courses
* Display total course count

### 📈 Admin Dashboard

* Total students
* Present students
* Absent students
* Average marks
* Total courses
* Attendance overview
* Recently added students

### 🔐 Authentication

* Admin login
* Protected dashboard access
* Admin authentication
* Secure environment configuration

---

## 🛠️ Technologies Used

### Frontend

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Chart.js | Attendance visualization |

### Backend

| Technology | Purpose |
| ---------- | ------- |
| Node.js | Server-side JavaScript runtime |
| Express.js | Backend framework and REST API |
| Mongoose | MongoDB object modeling |
| dotenv | Environment variable management |
| CORS | Cross-origin resource sharing |

### Database

**MongoDB**

MongoDB is used to store:

* Admin accounts
* Student records
* Attendance records
* Marks
* Courses

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* MongoDB Atlas

---

## 🏗️ Application Architecture

The application follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │       Admin         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  HTML / CSS / JS    │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                          HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │      + Node.js      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Mongoose       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    └─────────────────────┘

student-management-system/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Attendance.js
│   │   ├── Course.js
│   │   ├── Marks.js
│   │   └── Student.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── marksRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── createAdmin.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── frontend/
│   │
│   ├── images/
│   │   └── background.jpg
│   │
│   ├── index.html
│   ├── dashboard.html
│   ├── students.html
│   ├── attendance.html
│   ├── marks.html
│   ├── courses.html
│   ├── script.js
│   └── style.css
│
└── README.md

🔄 How the System Works
1. Admin Login

The administrator logs into the system using the login page.

2. Dashboard

After login, the admin can view important student management statistics.

3. Manage Students

The admin can add, view, update, and delete student records.

4. Manage Attendance

The admin can record attendance and monitor present and absent students.

5. Manage Marks

Student marks can be added and managed to monitor academic performance.

6. Manage Courses

The admin can create and manage available courses.

7. Database

All application data is stored in MongoDB and accessed through the Express.js backend using Mongoose.

🔌 REST API

The backend provides RESTful API endpoints for communication between the frontend and database.

Authentication
POST /api/auth/login
Students
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
Attendance
GET  /api/attendance
POST /api/attendance
Marks
GET  /api/marks
POST /api/marks
Courses
GET    /api/courses
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id

Some endpoints may require administrator authentication.

🗄️ Database Models
Admin

Stores administrator authentication information.

Admin
├── name
├── email
└── password
Student

Stores student information.

Student
├── name
├── email
├── phone
├── course
├── age
└── gender
Attendance

Stores student attendance records.

Attendance
├── student
├── date
└── status
Marks

Stores student academic marks.

Marks
├── student
├── subject
└── marks
Course

Stores course information.

Course
├── name
└── description
⚙️ Installation and Setup
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB / MongoDB Atlas
Git
Visual Studio Code
1. Clone the Repository
git clone https://github.com/ayesha-siddiqa-codes/student-management-system.git

Navigate to the project:

cd student-management-system
2. Backend Setup

Navigate to the backend folder:

cd backend

Install the required dependencies:

npm install
3. Environment Variables

The backend uses a .env file to store sensitive configuration such as the MongoDB connection string.

Create your own .env file inside the backend folder when setting up the project locally.

Example:

MONGO_URI=your_mongodb_connection_string

Never upload your .env file to GitHub. Keep database credentials and other sensitive information private.

4. Start the Backend

Run:

node server.js

The backend will run on:

http://localhost:5000
5. Open the Frontend

Open:

frontend/index.html

using your browser or VS Code Live Server.

🚀 Future Enhancements

The following features can be added in future versions:

Student search and filtering
Advanced attendance reports
Attendance percentage calculation
PDF report generation
Student profile pages
Export student records
Email notifications
Improved dashboard analytics
Improved responsive design
🎯 Project Goals

The main goals of this project are to:

Simplify student record management
Manage student attendance and marks
Organize course information
Demonstrate full-stack web development
Implement REST APIs
Work with MongoDB and Mongoose
Practice CRUD operations
Build a real-world management system
📚 What This Project Demonstrates

This project demonstrates practical experience with:

Full-stack web development
HTML, CSS, and JavaScript
Node.js and Express.js
REST API development
MongoDB and Mongoose
CRUD operations
Authentication
Frontend-backend integration
Git and GitHub
Database management

👩‍💻 Author

Ayesha Siddiqa

Full-Stack Web Development Project

GitHub: @ayesha-siddiqa-codes

📄 License

This project was created for educational and portfolio purposes.
