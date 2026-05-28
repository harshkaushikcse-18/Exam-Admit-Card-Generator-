// ================= Generate Admit Cards =================

function generateCards() {

    const output = document.getElementById("output");

    output.innerHTML = "";

    students.forEach((student) => {

        let rows = "";

        student.papers.forEach((paper, index) => {

            rows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${paper[0]}</td>
                    <td>${paper[1]}</td>
                    <td>${paper[2]}</td>
                    <td>${paper[3]}</td>
                    <td>${paper[4]}</td>
                </tr>
            `;
        });

        const cardHTML = `

            <div class="card">

                <!-- Header -->

                <div class="header">

                    <div class="logo">
                        <img src="assets/logo.png" alt="MNIT Logo">
                    </div>

                    <div class="header-center">

                        <div class="university">
                            MALAVIYA NATIONAL INSTITUTE OF TECHNOLOGY
                        </div>

                        <div class="title">
                            Admit Card (Demo), June 2026
                        </div>

                    </div>

                    <div style="text-align:right; min-width:190px;">

                        <div class="reg-roll">
                            Enroll No.: ${student.enrolno}
                        </div>

                        <div class="reg-roll" style="margin-top:6px;">
                            Roll No.: ${student.rollno}
                        </div>

                    </div>

                </div>

                <!-- Main Content -->

                <div class="main-content">

                    <div class="left">

                        <table class="info">

                            <tr>
                                <td>
                                    <strong>Course:</strong>
                                    ${student.course},
                                    ${student.semester}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Candidate's Name:</strong>
                                    ${student.name}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Exam Centre:</strong>
                                    ${student.centre}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Exam Time:</strong>
                                    ${student.time}
                                </td>
                            </tr>

                        </table>

                    </div>

                    <div class="right">

                        <div class="photo-box">
                            PASTE PHOTO HERE
                        </div>

                    </div>

                </div>

                <!-- Subject Table -->

                <table class="main-table">

                    <thead>

                        <tr>
                            <th>Sr. No</th>
                            <th>Exam Date</th>
                            <th>Code</th>
                            <th>Paper Name</th>
                            <th>Semester</th>
                            <th>Exam Type</th>
                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

                <!-- Note -->

                <div class="note">

                    <strong>Note:</strong><br>

                    • Reporting time at exam centre
                    at least 30 minutes before exam.<br>

                    • Carry admit card and valid ID proof.<br>

                    • Mobile phones / smart watches /
                    electronic gadgets are NOT allowed.

                </div>

                <!-- Footer -->

                <div class="footer">

                    <div class="footer-text">
                        Controller of Examination
                    </div>

                </div>

            </div>
        `;

        output.innerHTML += cardHTML;
    });
}

// ================= Download Combined PDF =================

async function downloadAllPDF() {

    try {

        // Generate cards automatically
        if (document.querySelectorAll(".card").length === 0) {

            generateCards();

            await new Promise(resolve =>
                setTimeout(resolve, 500)
            );
        }

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF("p", "pt", "a4");

        const cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {

            const canvas = await html2canvas(cards[i], {
                scale: 3,
                useCORS: true
            });

            const imgData =
                canvas.toDataURL("image/jpeg", 1.0);

            const pageWidth = 565;

            const pageHeight =
                (canvas.height * pageWidth) / canvas.width;

            if (i > 0) {
                doc.addPage();
            }

            doc.addImage(
                imgData,
                "JPEG",
                15,
                15,
                pageWidth,
                pageHeight
            );
        }

        doc.save("MNIT_Admit_Cards.pdf");

    } catch (error) {

        console.error(error);

        alert("PDF generation failed.");
    }
}