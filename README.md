# Intern Tracker

Intern Tracker is a web-based application used by the Department of CSE at SSN College of Engineering. It allows students to register, log in, and manage their internship records. This application is built using HTML, CSS, and JavaScript, with a backend that integrates Google Sheets for data storage.

video demo: https://drive.google.com/file/d/12E0hPeJnAuJe_xyxfCd614K6xLs2QKc0/view?usp=sharing

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
