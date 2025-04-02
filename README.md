# Intern Tracker

Intern Tracker is a web-based application created for the Department of CSE at SSN College of Engineering. It allows students to register, log in, and manage their internship records. This application is built using HTML, CSS, and JavaScript, with a backend that integrates Google Sheets for data storage.

video demo:
https://drive.google.com/file/d/12E0hPeJnAuJe_xyxfCd614K6xLs2QKc0/view?usp=sharing

google sheets:
https://docs.google.com/spreadsheets/d/12v_z6U7k_fYUXp6EgfMWj_t9zpW56-kZYbtrCRTmaag/edit?gid=0#gid=0

apps script deployment link:
https://script.google.com/macros/u/1/s/AKfycbwM6fg8f-PS5beEAIbguWPB1uRHBOxHgnHfFwNoHzbbWTTI5s8MoMrbS6qyW634iaLSxg/exec


## API Documentation

### **1. Register a New Student**
**Endpoint:** `POST /register-student`

#### **Request Body**
```json
{
  "username": "john_doe",
  "password": "securepassword",
  "register_number": "12345678",
  "email": "john.doe@example.com"
}
```

#### **Response (Success - 200)**
```json
{
  "message": "Student registered Successfully!"
}
```

#### **Response (Error - 400)**
```json
{
  "err": "Account already exists..."
}
```

### **2. Student Login**
**Endpoint:** `POST /login`

#### **Request Body**
```json
{
  "username": "john_doe",
  "password": "securepassword",
  "option": "student"
}
```

#### **Response (Success - 200)**
```json
{
  "username": "john_doe",
  "register_number": "12345678",
  "email": "john.doe@example.com"
}
```

#### **Response (Error - 400)**
```json
{
  "err": "Invalid credentials"
}
```

### **3. Admin Login**
**Endpoint:** `POST /login`

#### **Request Body**
```json
{
  "username": "admin@ssn.edu.in",
  "password": "ssn",
  "option": "teacher"
}
```

#### **Response (Success - 200)**
```json
{
  "message": "Signed Into Admin!"
}
```

### **4. Fetch All Students from Google Sheets**
**Endpoint:** `GET /fetch-sheet-students`

#### **Response (Success - 200)**
```json
[
  {
    "Register Number": "12345678",
    "Name": "John Doe",
    "Email": "john.doe@example.com",
    "Internship": "Software Developer at XYZ"
  }
]
```

### **5. Add a New Internship Record (Student)**
**Endpoint:** `POST /fetch-sheet-new-internship`

#### **Request Body**
```json
{
  "register_number": "12345678",
  "company": "XYZ Corp",
  "role": "Software Developer",
  "duration": "3 months"
}
```

#### **Response (Success - 200)**
```json
{
  "message": "Data added successfully!",
  "data": {
    "register_number": "12345678",
    "company": "XYZ Corp",
    "role": "Software Developer",
    "duration": "3 months"
  }
}
```

### **6. Fetch a Specific Student's Internship Record**
**Endpoint:** `GET /fetch-sheet-student?regno=12345678`

#### **Response (Success - 200)**
```json
[
  {
    "Register Number": "12345678",
    "Name": "John Doe",
    "Internship": "Software Developer at XYZ"
  }
]
```

#### **Response (Error - 404)**
```json
{
  "message": "No student found with the given Register Number."
}
```

## Google Apps Script Integration
### **Link to Apps Script webapp deployment:**
https://script.google.com/macros/s/AKfycbwM6fg8f-PS5beEAIbguWPB1uRHBOxHgnHfFwNoHzbbWTTI5s8MoMrbS6qyW634iaLSxg/exec
### **Link to excel sheet (for testing purposes):**
https://docs.google.com/spreadsheets/d/12v_z6U7k_fYUXp6EgfMWj_t9zpW56-kZYbtrCRTmaag/edit?usp=sharing


## InternTracker Frontend Layout

### **Login page layout**
- User can login as student or teacher
- Student can only add new internship update, or view his own internships
- Teacher has access rights to view the internship details of all the students
- The login credentials are stored locally in an excel sheet.
- Passwords are hashed using bcrypt to ensure confidentially.
- All login details are cached in localStorage of browser to ensure persistent login.

### **Register Student page layout**
- Students register using their ssn email id and password.

### **Student Home Page**
- View all the internships by the current logged in student user.
- Done using a get api call.
- Option to add a new internship with the student internship detail forms

### **Student Internship Form Page**
- Students add a new internship by filling the form details

### **Student Profile Page**
- Displays the user login information
- Includes details such as Name, Username, Batch, Department, Section, Phone Number

### **Teacher Home Page**
- View all the internships of all the students
- Various options to filter and view the students (see video for live demo)
- Filtering can be done based on section (A,B or C), internship source (CDC or external), year, whether the stipend is more than 1 lakh per month (super dream offer) and location (india or abroad).


## Setup Instructions

### **Prerequisites**
- Node.js installed
- MongoDB (if using a database instead of Google Sheets)

### **Installation**
1. Clone the repository:
   ```sh
   git clone https://github.com/shemzegem200/InternTracker.git
   cd InternTracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node index.js
   ```

## Contributing
Feel free to submit a pull request or raise an issue for improvements.
