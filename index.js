// Selecting the input fields and buttons
const StuName = document.getElementById("name");
const StuID = document.querySelector("#ID");
const StuEmail = document.querySelector("#email");
const StuContact = document.querySelector("#contact");
const InnerBox = document.querySelector(".inner-box-2");
const btnInput = document.querySelector(".subBtn");

// Tracking the div that is going to be edited
let editingElement = null;

// ubmit button function
btnInput.addEventListener("click", submit);

function submit() {
    const studentData = {
        name: StuName.value,
        id: StuID.value,
        email: StuEmail.value,
        contact: StuContact.value
    };

    // Validating Input Fields as required
    if (!isValidName(studentData.name) || !isValidID(studentData.id) || !isValidEmail(studentData.email) || !isValidContact(studentData.contact)) {
        alert("Please enter valid data!");
        return; 
    }

    if (editingElement) {
        editingElement.children[0].innerHTML = studentData.name;
        editingElement.children[1].innerHTML = studentData.id;
        editingElement.children[2].innerHTML = studentData.email;
        editingElement.children[3].innerHTML = studentData.contact;

        editingElement = null;
        btnInput.innerHTML = "Submit"; 
    } else {
        createStudentElement(studentData);
    }

    // For Clearing the form inputs after submission
    StuName.value = '';
    StuID.value = '';
    StuEmail.value = '';
    StuContact.value = '';
    
    // For vertical scrollbar
    enableVerticalScroll('box-2');

    saveStudentData();
}

// Function to create a new student entry in the display
function createStudentElement(studentData) {
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("data");

    const first = document.createElement("p");
    first.innerHTML = studentData.name;
    const second = document.createElement("p");
    second.innerHTML = studentData.id;
    const third = document.createElement("p");
    third.innerHTML = studentData.email;
    const fourth = document.createElement("p");
    fourth.innerHTML = studentData.contact;

    const edit = document.createElement("button");
    edit.classList.add("editbtn");
    edit.innerHTML = "Edit";

    const dlt = document.createElement("button");
    dlt.classList.add("deletebtn");
    dlt.innerHTML = "Delete";

    dataDiv.appendChild(first);
    dataDiv.appendChild(second);
    dataDiv.appendChild(third);
    dataDiv.appendChild(fourth);
    dataDiv.appendChild(edit);
    dataDiv.appendChild(dlt);

    InnerBox.appendChild(dataDiv);

    enableVerticalScroll('box-2');
}

// vertical scroll function
function enableVerticalScroll(className) {
    const element = document.querySelector(".box-2");

    const contentHeight = element.scrollHeight;
    const maxHeight = 520;

    // If content is larger than the max height, adding scrollbar
    if (contentHeight > maxHeight) {
        element.style.height = maxHeight + 'px';
        element.style.overflowY = 'scroll';
    } else {
        element.style.overflowY = 'auto';
    }
}


// Delete and Edit button
InnerBox.addEventListener("click", function (e) {
    const item = e.target;

    // Delete button function
    if (item.classList.contains("deletebtn")) {
        const parent = item.parentElement;
        parent.remove();
        saveStudentData();
        enableVerticalScroll('box-2');
    }

    // Edit button function
    if (item.classList.contains("editbtn")) {
        const parent = item.parentElement;
        const fields = parent.querySelectorAll("p");

        StuName.value = parent.children[0].innerHTML;
        StuID.value = parent.children[1].innerHTML;
        StuEmail.value = parent.children[2].innerHTML;
        StuContact.value = parent.children[3].innerHTML;

        // Clearing the data in the div
        fields[0].innerHTML = '';
        fields[1].innerHTML = '';
        fields[2].innerHTML = '';
        fields[3].innerHTML = '';

        editingElement = parent;

        btnInput.innerHTML = "Save";

        // Again updating local storage after editing
        saveStudentData();
    }
});

// Saveing data to local storage so that the data should be stored and on reload or refresh the display will take back the data from the local storage
function saveStudentData() {
    const students = [];
    
    document.querySelectorAll(".data").forEach((dataDiv) => {
        // Creating a student object for tacking back the content from each child of the .data div
        const student = {
            name: dataDiv.children[0].innerHTML,  
            id: dataDiv.children[1].innerHTML,    
            email: dataDiv.children[2].innerHTML, 
            contact: dataDiv.children[3].innerHTML 
        };
        
        // Adding the student object to the students array
        students.push(student);
    });
    
    // saveing the students array to local storage
    localStorage.setItem("students", JSON.stringify(students));
}

// for taking back the data from the local storage on reloading or refreshing
document.addEventListener("DOMContentLoaded", loadStudentsFromStorage);

function loadStudentsFromStorage() {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach((studentData) => {
        createStudentElement(studentData);
    });
}

// Validating the input fields
function isValidName(name) {
    return /^[A-Za-z\s]+$/.test(name);
    
}

function isValidID(id) {
    return /^\d+$/.test(id);
}

function isValidEmail(email) {
    const atSymbol = email.indexOf('@');
    const dotSymbol = email.lastIndexOf('.');
    return atSymbol > 0 && dotSymbol > atSymbol + 1 && dotSymbol < email.length - 1;
}

function isValidContact(contact) {
    return /^\d+$/.test(contact);
}
