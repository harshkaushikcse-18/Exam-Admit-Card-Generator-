// ================= Student Data =================

const students = [

    {
        name: "Rahul Sharma",
        enrolno: "2024MNIT001",
        rollno: "24CS001",

        course: "B.Tech Computer Science Engineering",
        semester: "2nd Semester",

        centre: "MNIT Jaipur",
        time: "09:30 AM To 12:30 PM",

        papers: [
            ["02/06/2026", "CS201", "Data Structures", "2nd", "Regular"],
            ["04/06/2026", "CS202", "Discrete Mathematics", "2nd", "Regular"],
            ["08/06/2026", "CS203", "Digital Logic", "2nd", "Regular"]
        ]
    }

];

// Make globally accessible
window.students = students;