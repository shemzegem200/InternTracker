const dimBg = document.getElementsByClassName('dim-bg')[0];
const studInternForm = document.getElementById('stud-intern-form');
const internSubmitBtn = document.getElementById('intern-submit-btn');
const tableBody = document.getElementById('intern-table-body');
const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData?.username); // Outputs stored username
console.log(userData?.register_number); // Outputs stored username
console.log(userData?.option);   // Outputs 'student' or 'teacher'
if(!userData){
    localStorage.clear();
    window.location.href ='../index.html';
};

function logout(){
    localStorage.clear();
    window.location.href = '../index.html';
}

async function viewInternships() {
    try {
        let response = await fetch(`http://localhost:4000/fetch-sheet-student?regno=${userData.register_number}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let internships = await response.json(); // Properly parse JSON
        console.log(internships);
        if (!Array.isArray(internships)) {
            throw new Error("Invalid response format: Expected an array.");
        }
        let tableBody = document.getElementById("intern-table-body"); // Ensure tableBody is defined
        tableBody.innerHTML = ""; // Clear previous entries if necessary

        localStorage.setItem("student_intern", JSON.stringify(internships));
        let i = 1;
        for (let obj of internships) {
            let tempTr = document.createElement("tr");
            tempTr.innerHTML = `
                <td>${i++}</td>
                <td>${obj["Company Name"]}</td>
                <td>${obj["Research\n/Industry"]}</td>
                <td>${obj["Title"]}</td>
                <td>${obj["Period"]}</td>
                <td>${obj["Start Date"]}</td>
                <td>${obj["End Date"]}</td>
                <td>${obj["Stipend\n(In Rs.)"]}</td>
            `;
            tableBody.appendChild(tempTr);
        }
    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
}


async function openModal(){
    dimBg.style.display = 'block';
    document.querySelector(".model-container").scrollTop = 0; // Scroll to top
}
async function closeModal(){
    event.preventDefault();
    internSubmitBtn.disabled= true;
    internSubmitBtn.style.cursor = 'not-allowed';
    internSubmitBtn.textContent= 'Submitting..';
    //     "register_number": userData.register_number,
    //     "name": userData.name,
    //     "title": document.getElementById('title-input').value.trim(),
    //     "type": document.getElementById('type-input').value,
    //     "mobile": userData.mobile,
    //     "period": document.getElementById('period-input').value,
    //     "start_date": document.getElementById('start-date-input').value.toString(),
    //     "end_date": document.getElementById('end-date-input').value.toString(),
    //     "company_name": document.getElementById('company-name-input').value,
    //     "source": document.getElementById('source-input').value.trim(),
    //     "stipend": document.getElementById('stipend-input').value.trim(),
    //     "op1": document.getElementById('op1').checked? 'YES' : 'NO',
    //     "op2": document.getElementById('op2').checked? 'YES' : 'NO',
    //     "op3": document.getElementById('op3').checked? 'YES' : 'NO',
    //     "op4": document.getElementById('op4').checked? 'YES' : 'NO',
    //     "op5": document.getElementById('op5').checked? 'YES' : 'NO'
    // };
    let temp = document.getElementById('stipend-input').value.trim();
    const obj = {
        "Register Number": userData.register_number,
        "Name": userData.name,
        "Section": userData.section,
        "Obtained Internship or Not": "Yes",
        "Title": document.getElementById('title-input').value.trim(),
        "Research\n/Industry": document.getElementById('type-input').value,
        "Abroad / India": document.getElementById('location-input').value,
        "Mobile No.": userData.mobile,
        "Period": document.getElementById('period-input').value,
        "Start Date": document.getElementById('start-date-input').value.toString(),
        "End Date": document.getElementById('end-date-input').value.toString(),
        "Company Name": document.getElementById('company-name-input').value,
        "Placement thru college / outside": document.getElementById('source-input').value.trim(),
        "Stipend\n(In Rs.)": temp==='0'? 'Unpaid' : temp,
        "Signed Permission Letter, Offer Letter Submitted (Yes / No)": document.getElementById('op1').checked ? 'Yes' : 'No',
        "Completion Certificte Submitted (Yes/No)": document.getElementById('op2').checked ? 'Yes' : 'No',
        "Internship Report Submitted (Yes/No)": document.getElementById('op3').checked ? 'Yes' : 'No',
        "Student Feedback (About Internship) Submitted \n(Yes/No)": document.getElementById('op4').checked ? 'Yes' : 'No',
        "Employer Feedback (About student) Submitted (Yes/No)": document.getElementById('op5').checked ? 'Yes' : 'No'
    };

    try{
        const response = await fetch('http://localhost:4000/fetch-sheet-new-internship',{
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-Type': 'application/json'}
        });
        const result = await response.json();
        if (!response.ok){
            throw new Error(result.err || 'Something went wrong!');
        }
        console.log("Success:", result);
        //call the view internships function again, to update local storage
        viewInternships();
        alert('Added Successfully!');
    }
    catch(err){
        console.log(err);
        alert(err.message);
    }
    finally{
        dimBg.style.display='none';
        internSubmitBtn.disabled = false;
        internSubmitBtn.style.cursor = "pointer";
        internSubmitBtn.textContent = 'Submit';
        viewInternships();
    }
}


function getInternshipsFromLocalStorage(studInterns){
    const interns = JSON.parse(studInterns);
    let i = 1;
    tableBody.innerHTML = ""; // Clear previous entries if necessary
        for (let obj of interns) {
            let tempTr = document.createElement("tr");
            tempTr.innerHTML = `
                <td>${i++}</td>
                <td>${obj["Company Name"]}</td>
                <td>${obj["Research\n/Industry"]}</td>
                <td>${obj["Title"]}</td>
                <td>${obj["Period"]}</td>
                <td>${obj["Start Date"]}</td>
                <td>${obj["End Date"]}</td>
                <td>${obj["Stipend\n(In Rs.)"]}</td>
            `;
            tableBody.appendChild(tempTr);
        }
}

let studInterns = localStorage.getItem("student_intern")
if (!studInterns) viewInternships();
else getInternshipsFromLocalStorage(studInterns);