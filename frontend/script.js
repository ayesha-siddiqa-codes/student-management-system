// =====================================================
// API URLS
// =====================================================

const API_URL = "https://student-management-system-qyfs.onrender.com/api/students";
const ATTENDANCE_API = "https://student-management-system-qyfs.onrender.com/api/attendance";
const MARKS_API = "https://student-management-system-qyfs.onrender.com/api/marks";
const COURSES_API = "https://student-management-system-qyfs.onrender.com/api/courses";

let allStudents = [];
let allCourses = [];
let attendanceChart = null;


// =====================================================
// STUDENTS
// =====================================================

async function loadStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        const students = await response.json();

        allStudents = Array.isArray(students) ? students : [];

        displayStudents(allStudents);
        displayRecentStudents(allStudents);
        updateStudentCount(allStudents);

    } catch (error) {
        console.error("Error loading students:", error);
    }
}


// =====================================================
// DISPLAY STUDENTS
// =====================================================

function displayStudents(students) {
    const table = document.getElementById("studentsTable");

    if (!table) return;

    table.innerHTML = "";

    if (!Array.isArray(students)) return;

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name || ""}</td>
            <td>${student.email || ""}</td>
            <td>${student.phone || ""}</td>
            <td>${student.course || ""}</td>
            <td>${student.age || ""}</td>
            <td>${student.gender || ""}</td>
            <td>
                <button onclick="editStudent('${student._id}')">
                    Edit
                </button>

                <button
                    onclick="deleteStudent('${student._id}')"
                    style="margin-left:5px;"
                >
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// =====================================================
// STUDENT COUNT
// =====================================================

function updateStudentCount(students) {
    const count = document.getElementById("studentCount");

    if (count) {
        count.textContent = Array.isArray(students)
            ? students.length
            : 0;
    }
}


// =====================================================
// RECENT STUDENTS
// =====================================================

function displayRecentStudents(students) {
    const table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = "";

    if (!Array.isArray(students)) return;

    const recentStudents = students.slice(-5).reverse();

    recentStudents.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name || ""}</td>
            <td>${student.email || ""}</td>
            <td>${student.course || ""}</td>
        `;

        table.appendChild(row);
    });
}


// =====================================================
// SEARCH STUDENTS
// =====================================================

function searchStudents() {
    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredStudents = allStudents.filter(student => {
        const name = (student.name || "").toLowerCase();
        const email = (student.email || "").toLowerCase();
        const course = (student.course || "").toLowerCase();

        return (
            name.includes(searchValue) ||
            email.includes(searchValue) ||
            course.includes(searchValue)
        );
    });

    displayStudents(filteredStudents);
}


// =====================================================
// ADD STUDENT FORM
// =====================================================

function showAddStudent() {
    const form = document.getElementById("studentFormContainer");

    if (form) {
        form.style.display = "block";
    }
}


function hideAddStudent() {
    const form = document.getElementById("studentFormContainer");

    if (form) {
        form.style.display = "none";
    }
}


// =====================================================
// ADD STUDENT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");

    if (!studentForm) return;

    studentForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const studentData = {
            name: document.getElementById("studentName").value.trim(),
            email: document.getElementById("studentEmail").value.trim(),
            phone: document.getElementById("studentPhone").value.trim(),
            course: document.getElementById("studentCourse").value.trim(),
            age: Number(document.getElementById("studentAge").value),
            gender: document.getElementById("studentGender").value
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Failed to add student.");
                return;
            }

            alert("Student added successfully!");

            studentForm.reset();
            hideAddStudent();

            await loadStudents();
            await loadStudentOptions();

        } catch (error) {
            console.error("Add student error:", error);
            alert("Failed to add student.");
        }
    });
});


// =====================================================
// EDIT STUDENT
// =====================================================

async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        const student = await response.json();

        if (!response.ok) {
            alert(student.message || "Failed to load student.");
            return;
        }

        document.getElementById("editStudentId").value = student._id;
        document.getElementById("editStudentName").value = student.name || "";
        document.getElementById("editStudentEmail").value = student.email || "";
        document.getElementById("editStudentPhone").value = student.phone || "";
        document.getElementById("editStudentCourse").value = student.course || "";
        document.getElementById("editStudentAge").value = student.age || "";
        document.getElementById("editStudentGender").value = student.gender || "";

        const editForm = document.getElementById("editFormContainer");

        if (editForm) {
            editForm.style.display = "block";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error("Edit student error:", error);
        alert("Failed to load student.");
    }
}


// =====================================================
// HIDE EDIT STUDENT FORM
// =====================================================

function hideEditStudent() {
    const form = document.getElementById("editFormContainer");

    if (form) {
        form.style.display = "none";
    }
}


// =====================================================
// UPDATE STUDENT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const editStudentForm = document.getElementById("editStudentForm");

    if (!editStudentForm) return;

    editStudentForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const id = document.getElementById("editStudentId").value;

        const updatedStudent = {
            name: document.getElementById("editStudentName").value.trim(),
            email: document.getElementById("editStudentEmail").value.trim(),
            phone: document.getElementById("editStudentPhone").value.trim(),
            course: document.getElementById("editStudentCourse").value.trim(),
            age: Number(document.getElementById("editStudentAge").value),
            gender: document.getElementById("editStudentGender").value
        };

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedStudent)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Failed to update student.");
                return;
            }

            alert("Student updated successfully!");

            editStudentForm.reset();
            hideEditStudent();

            await loadStudents();
            await loadStudentOptions();

        } catch (error) {
            console.error("Update student error:", error);
            alert("Failed to update student.");
        }
    });
});


// =====================================================
// DELETE STUDENT
// =====================================================

async function deleteStudent(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Failed to delete student.");
            return;
        }

        alert("Student deleted successfully!");

        await loadStudents();
        await loadStudentOptions();

    } catch (error) {
        console.error("Delete student error:", error);
        alert("Failed to delete student.");
    }
}


// =====================================================
// STUDENT DROPDOWNS
// =====================================================

async function loadStudentOptions() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        const students = await response.json();

        const safeStudents = Array.isArray(students)
            ? students
            : [];

        const attendanceSelect =
            document.getElementById("attendanceStudent");

        const marksSelect =
            document.getElementById("marksStudent");

        if (attendanceSelect) {
            attendanceSelect.innerHTML =
                `<option value="">Select Student</option>`;

            safeStudents.forEach(student => {
                const option = document.createElement("option");

                option.value = student._id;
                option.textContent = student.name;

                attendanceSelect.appendChild(option);
            });
        }

        if (marksSelect) {
            marksSelect.innerHTML =
                `<option value="">Select Student</option>`;

            safeStudents.forEach(student => {
                const option = document.createElement("option");

                option.value = student._id;
                option.textContent = student.name;

                marksSelect.appendChild(option);
            });
        }

    } catch (error) {
        console.error("Error loading student options:", error);
    }
}


// =====================================================
// ATTENDANCE FORM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const attendanceForm =
        document.getElementById("attendanceForm");

    if (!attendanceForm) return;

    loadStudentOptions();

    attendanceForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = {
            student:
                document.getElementById("attendanceStudent").value,

            date:
                document.getElementById("attendanceDate").value,

            status:
                document.getElementById("attendanceStatus").value
        };

        try {
            const response = await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.message ||
                    "Failed to save attendance."
                );
                return;
            }

            alert("Attendance saved successfully!");

            attendanceForm.reset();

            await loadAttendance();
            await updateAttendanceStats();
            await loadAttendanceChart();

        } catch (error) {
            console.error("Attendance error:", error);
            alert("Failed to save attendance.");
        }
    });
});


// =====================================================
// LOAD ATTENDANCE
// =====================================================

async function loadAttendance() {
    const table = document.getElementById("attendanceTable");

    if (!table) return;

    try {
        const response = await fetch(ATTENDANCE_API);

        if (!response.ok) {
            throw new Error("Failed to load attendance");
        }

        const records = await response.json();

        const safeRecords = Array.isArray(records)
            ? records
            : [];

        table.innerHTML = "";

        safeRecords.forEach(record => {
            const row = document.createElement("tr");

            const studentName =
                record.student && record.student.name
                    ? record.student.name
                    : "Unknown";

            const date = formatDate(record.date);

            row.innerHTML = `
                <td>${studentName}</td>
                <td>${date}</td>
                <td>${record.status || ""}</td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading attendance:", error);
    }
}


// =====================================================
// MARKS FORM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const marksForm = document.getElementById("marksForm");

    if (!marksForm) return;

    loadStudentOptions();

    marksForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = {
            student:
                document.getElementById("marksStudent").value,

            subject:
                document.getElementById("marksSubject").value.trim(),

            marks:
                Number(
                    document.getElementById("marksValue").value
                )
        };

        try {
            const response = await fetch(MARKS_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.message ||
                    "Failed to save marks."
                );
                return;
            }

            alert("Marks saved successfully!");

            marksForm.reset();

            await loadMarks();
            await updateMarksStats();

        } catch (error) {
            console.error("Marks error:", error);
            alert("Failed to save marks.");
        }
    });
});


// =====================================================
// LOAD MARKS
// =====================================================

async function loadMarks() {
    const table = document.getElementById("marksTable");

    if (!table) return;

    try {
        const response = await fetch(MARKS_API);

        if (!response.ok) {
            throw new Error("Failed to load marks");
        }

        const records = await response.json();

        const safeRecords = Array.isArray(records)
            ? records
            : [];

        table.innerHTML = "";

        safeRecords.forEach(record => {
            const row = document.createElement("tr");

            const studentName =
                record.student && record.student.name
                    ? record.student.name
                    : "Unknown";

            row.innerHTML = `
                <td>${studentName}</td>
                <td>${record.subject || ""}</td>
                <td>${record.marks || 0}</td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading marks:", error);
    }
}


// =====================================================
// DATE FUNCTIONS
// =====================================================

function getTodayString() {
    const today = new Date();

    const year = today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function formatDate(dateValue) {
    if (!dateValue) {
        return "";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString();
}


// =====================================================
// ATTENDANCE STATISTICS
// =====================================================

async function updateAttendanceStats() {
    const presentElement =
        document.getElementById("presentCount");

    const absentElement =
        document.getElementById("absentCount");

    if (!presentElement && !absentElement) {
        return;
    }

    try {
        const response = await fetch(ATTENDANCE_API);

        if (!response.ok) {
            throw new Error(
                "Failed to load attendance statistics"
            );
        }

        const records = await response.json();

        const safeRecords = Array.isArray(records)
            ? records
            : [];

        const todayString = getTodayString();

        let present = 0;
        let absent = 0;

        safeRecords.forEach(record => {
            if (!record.date) return;

            const recordDate = new Date(record.date);

            if (isNaN(recordDate.getTime())) {
                return;
            }

            const year = recordDate.getFullYear();

            const month =
                String(
                    recordDate.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    recordDate.getDate()
                ).padStart(2, "0");

            const recordDateString =
                `${year}-${month}-${day}`;

            if (recordDateString === todayString) {
                const status =
                    String(record.status || "")
                        .toLowerCase()
                        .trim();

                if (status === "present") {
                    present++;
                }

                if (status === "absent") {
                    absent++;
                }
            }
        });

        if (presentElement) {
            presentElement.textContent = present;
        }

        if (absentElement) {
            absentElement.textContent = absent;
        }

    } catch (error) {
        console.error(
            "Error loading attendance statistics:",
            error
        );
    }
}


// =====================================================
// AVERAGE MARKS
// =====================================================

async function updateMarksStats() {
    const averageElement =
        document.getElementById("averageMarks");

    if (!averageElement) {
        return;
    }

    try {
        const response = await fetch(MARKS_API);

        if (!response.ok) {
            throw new Error(
                "Failed to load marks statistics"
            );
        }

        const records = await response.json();

        const safeRecords = Array.isArray(records)
            ? records
            : [];

        if (!safeRecords.length) {
            averageElement.textContent = "0";
            return;
        }

        const total = safeRecords.reduce(
            (sum, record) => {
                return (
                    sum +
                    Number(record.marks || 0)
                );
            },
            0
        );

        const average =
            total / safeRecords.length;

        averageElement.textContent =
            average.toFixed(1);

    } catch (error) {
        console.error(
            "Error loading marks statistics:",
            error
        );
    }
}


// =====================================================
// COURSES
// =====================================================

function showAddCourse() {
    const form =
        document.getElementById("courseFormContainer");

    if (form) {
        form.style.display = "block";
    }
}


function hideAddCourse() {
    const form =
        document.getElementById("courseFormContainer");

    if (form) {
        form.style.display = "none";
    }
}


// =====================================================
// LOAD COURSES
// =====================================================

async function loadCourses() {
    try {
        const response = await fetch(COURSES_API);

        if (!response.ok) {
            throw new Error("Failed to load courses");
        }

        const courses = await response.json();

        allCourses =
            Array.isArray(courses)
                ? courses
                : [];

        displayCourses(allCourses);
        updateCourseCount(allCourses);

    } catch (error) {
        console.error("Error loading courses:", error);

        updateCourseCount([]);
    }
}


// =====================================================
// COURSE COUNT
// =====================================================

function updateCourseCount(courses) {
    const count =
        document.getElementById("courseCount");

    if (count) {
        count.textContent =
            Array.isArray(courses)
                ? courses.length
                : 0;
    }
}


// =====================================================
// DISPLAY COURSES
// =====================================================

function displayCourses(courses) {
    const table =
        document.getElementById("coursesTable");

    if (!table) return;

    table.innerHTML = "";

    if (!Array.isArray(courses)) {
        return;
    }

    courses.forEach(course => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.name || ""}</td>
            <td>${course.code || ""}</td>
            <td>${course.duration || ""}</td>
            <td>${course.department || ""}</td>

            <td>
                <button onclick="editCourse('${course._id}')">
                    Edit
                </button>

                <button
                    onclick="deleteCourse('${course._id}')"
                    style="
                        margin-left:6px;
                        background:#b08d57;
                    "
                >
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// =====================================================
// ADD COURSE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const courseForm =
        document.getElementById("courseForm");

    if (!courseForm) return;

    courseForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const courseData = {
            name:
                document.getElementById("courseName")
                    .value.trim(),

            code:
                document.getElementById("courseCode")
                    .value.trim(),

            duration:
                document.getElementById("courseDuration")
                    .value.trim(),

            department:
                document.getElementById("courseDepartment")
                    .value.trim()
        };

        try {
            const response = await fetch(COURSES_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(courseData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.message ||
                    "Failed to add course."
                );
                return;
            }

            alert("Course added successfully!");

            courseForm.reset();
            hideAddCourse();

            await loadCourses();

        } catch (error) {
            console.error("Add course error:", error);
            alert("Failed to add course.");
        }
    });
});


// =====================================================
// SEARCH COURSES
// =====================================================

function searchCourses() {
    const searchInput =
        document.getElementById("courseSearch");

    if (!searchInput) return;

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const filteredCourses =
        allCourses.filter(course => {
            const name =
                (course.name || "").toLowerCase();

            const code =
                (course.code || "").toLowerCase();

            const department =
                (course.department || "").toLowerCase();

            return (
                name.includes(searchValue) ||
                code.includes(searchValue) ||
                department.includes(searchValue)
            );
        });

    displayCourses(filteredCourses);
}


// =====================================================
// EDIT COURSE
// =====================================================

async function editCourse(id) {
    try {
        const response =
            await fetch(`${COURSES_API}/${id}`);

        const course =
            await response.json();

        if (!response.ok) {
            alert(
                course.message ||
                "Failed to load course."
            );
            return;
        }

        const newName =
            prompt(
                "Enter course name:",
                course.name || ""
            );

        if (newName === null) return;

        const newCode =
            prompt(
                "Enter course code:",
                course.code || ""
            );

        if (newCode === null) return;

        const newDuration =
            prompt(
                "Enter duration:",
                course.duration || ""
            );

        if (newDuration === null) return;

        const newDepartment =
            prompt(
                "Enter department:",
                course.department || ""
            );

        if (newDepartment === null) return;

        const updatedCourse = {
            name: newName.trim(),
            code: newCode.trim(),
            duration: newDuration.trim(),
            department: newDepartment.trim()
        };

        const updateResponse =
            await fetch(`${COURSES_API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCourse)
            });

        const result =
            await updateResponse.json();

        if (!updateResponse.ok) {
            alert(
                result.message ||
                "Failed to update course."
            );
            return;
        }

        alert("Course updated successfully!");

        await loadCourses();

    } catch (error) {
        console.error("Edit course error:", error);
        alert("Failed to load/update course.");
    }
}


// =====================================================
// DELETE COURSE
// =====================================================

async function deleteCourse(id) {
    const confirmed =
        confirm(
            "Are you sure you want to delete this course?"
        );

    if (!confirmed) return;

    try {
        const response =
            await fetch(`${COURSES_API}/${id}`, {
                method: "DELETE"
            });

        const result =
            await response.json();

        if (!response.ok) {
            alert(
                result.message ||
                "Failed to delete course."
            );
            return;
        }

        alert("Course deleted successfully!");

        await loadCourses();

    } catch (error) {
        console.error("Delete course error:", error);
        alert("Failed to delete course.");
    }
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {
    localStorage.removeItem("admin");

    window.location.href = "index.html";
}


// =====================================================
// ATTENDANCE PIE CHART
// =====================================================

async function loadAttendanceChart() {
    const canvas =
        document.getElementById("attendanceChart");

    if (!canvas) {
        return;
    }

    if (typeof Chart === "undefined") {
        console.error("Chart.js is not loaded.");
        return;
    }

    try {
        const response =
            await fetch(ATTENDANCE_API);

        if (!response.ok) {
            throw new Error(
                "Failed to load attendance data"
            );
        }

        const records =
            await response.json();

        const safeRecords =
            Array.isArray(records)
                ? records
                : [];

        let present = 0;
        let absent = 0;

        safeRecords.forEach(record => {
            const status =
                String(record.status || "")
                    .toLowerCase()
                    .trim();

            if (status === "present") {
                present++;
            }

            if (status === "absent") {
                absent++;
            }
        });

        console.log(
            "Attendance records:",
            safeRecords
        );

        console.log(
            "Present:",
            present,
            "Absent:",
            absent
        );

        if (attendanceChart) {
            attendanceChart.destroy();
        }

        attendanceChart =
            new Chart(canvas, {
                type: "pie",

                data: {
                    labels: [
                        "Present",
                        "Absent"
                    ],

                    datasets: [
                        {
                            data: [
                                present,
                                absent
                            ],

                            backgroundColor: [
                                "#198754",
                                "#c0392b"
                            ],

                            borderColor: "#ffffff",

                            borderWidth: 3
                        }
                    ]
                },

                options: {
                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            display: true,

                            position: "bottom",

                            labels: {
                                padding: 20,

                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });

    } catch (error) {
        console.error(
            "Attendance chart error:",
            error
        );
    }
}


// =====================================================
// DASHBOARD STARTUP
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log("Dashboard loading...");

        await loadStudents();

        await loadAttendance();

        await loadMarks();

        await updateAttendanceStats();

        await updateMarksStats();

        await loadCourses();

        // loadCourses() already updates
        // the course count.

        await loadAttendanceChart();

        console.log(
            "Dashboard loaded successfully."
        );
    }
);