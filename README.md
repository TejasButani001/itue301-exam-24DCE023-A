# 🏥 ITUE301 — Advanced Web Development Frameworks
## Open-Book Practical Examination — Set A: Hospital Appointment System

**Student Name:** [Tejas Butani](https://github.com/TejasButani001)  
**Roll Number:** 24DCE023  
**Batch:** A  
**GitHub Repository:** [https://github.com/TejasButani001/itue301-exam-24DCE023-A](https://github.com/TejasButani001/itue301-exam-24DCE023-A)  
**Application Name:** MedCare Plus — Hospital Appointment System  
**Tech Stack:** React.js + Express.js + MongoDB (Mongoose)

---

## 📌 Project Overview
**MedCare Plus** is a full-stack Hospital Appointment System built for managing doctors, patients, and healthcare appointments. The project is implemented using modern web development practices following a 5-task modular architecture.

---

## 📋 Summary of Practical Examination Tasks

| Task # | Exam Task Description | Status | Key Features Implemented |
| :--- | :--- | :---: | :--- |
| **Task 1** | **React Component Architecture** | ✅ **Done** | Built `HomePage`, `DoctorsPage`, `BookingPage`, `Navbar`, and reusable `AppointmentCard` component (accepts 5 props: `patientName`, `doctorName`, `date`, `timeSlot`, `status` with dynamic badge styling for `confirmed`, `pending`, `cancelled`). |
| **Task 2** | **React Routing & State Management** | ✅ **Done** | Configured `BrowserRouter`, `Routes`, `Route`, and `<Link>` for navigation without full-page reloads. Created an interactive appointment form in `BookingPage` using `useState` with a live form state preview. |
| **Task 3** | **Express REST API + Middleware** | ✅ **Done** | Built Express backend with endpoints `GET /api/v1/doctors`, `GET /api/v1/appointments`, `POST /api/v1/appointments`. Created global `requestLogger` middleware `[METHOD] [PATH] [TIMESTAMP]` and global error-handling middleware returning structured JSON with HTTP status codes (200, 201, 500). |
| **Task 4** | **REST API Consumption in React** | ✅ **Done** | Consumed Express API in `DoctorsPage` using native `fetch()` inside `useEffect()`. Maintained 3 state variables (`data`, `loading`, `error`) and displayed Doctor Name, Specialisation, and Availability status (`Yes`/`No`). |
| **Task 5** | **MongoDB + Mongoose Schema & Validation** | ✅ **Done** | Designed Mongoose schemas for `Patient` (unique email, blood group enum), `Doctor` (default availability `true`), and `Appointment` (Mongoose ObjectId refs, maxlength 300). Handled Mongoose validation errors gracefully returning custom JSON error responses. |

---

## 🚀 How to Run the Project

### 1. Environment Setup (`.env`)
Create a `.env` file in the root folder (refer to `.env.example`):
```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
PORT=5000
```

### 2. Run Backend (Express Server)
Open a terminal window and run:
```bash
cd backend
npm install
node server.js
```
> 🟢 **Backend running on:** `http://localhost:5000`

### 3. Run Frontend (React Application)
Open a second terminal window and run:
```bash
cd frontend
npm install
npm run dev
```
> 🟢 **Frontend running on:** `http://localhost:5173`

### 4. Database Seeding & Mongoose Test Script (Optional)
To populate sample doctors and test MongoDB schema validations:
```bash
cd backend
node seed.js       # Seeds 10 specialist doctors and sample records into MongoDB
node mongoTest.js  # Tests Mongoose connection, references, and validation error handling
```

---

## 🔗 REST API Endpoint Reference

| Method | Endpoint | Purpose | HTTP Status |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/doctors` | Retrieve all specialist doctors | `200 OK` |
| `GET` | `/api/v1/appointments` | Retrieve all appointments | `200 OK` |
| `POST` | `/api/v1/appointments` | Create a new appointment | `201 Created` |
| `GET` | `/api/v1/appointments/:id` | Retrieve single appointment by ID | `200 OK` |
| `PUT` | `/api/v1/appointments/:id` | Update appointment details | `200 OK` |
| `DELETE` | `/api/v1/appointments/:id` | Delete appointment by ID | `200 OK` |
| `POST` | `/api/v1/test-validation` | Test Mongoose schema validation failure response | `400 Bad Request` |

---

## 📂 Repository Structure

```text
itue301-exam-24DCE023-A/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # SPA Navigation Links
│   │   │   └── AppointmentCard.jsx  # Appointment Card Component (5 Props)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # System Welcome Page
│   │   │   ├── DoctorsPage.jsx      # API Data Fetching with useEffect (3 States)
│   │   │   └── BookingPage.jsx      # Appointment Form & Live useState Preview
│   │   ├── App.jsx                  # React Router Route Configuration
│   │   ├── main.jsx                 # BrowserRouter Provider Wrapper
│   │   └── index.css                # Styling stylesheet
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Patient.js               # Patient Mongoose Schema
│   │   ├── Doctor.js                # Doctor Mongoose Schema
│   │   └── Appointment.js           # Appointment Mongoose Schema
│   ├── server.js                    # Express Server & Middleware
│   ├── seed.js                      # MongoDB Data Seeding Script
│   ├── mongoTest.js                 # Task 5 Mongoose Connection & Validation Test
│   └── package.json
│
├── .env                             # Local Environment Variables (Ignored)
├── .env.example                     # Environment Template
├── .gitignore                       # Git Ignore Rules
└── README.md                        # Documentation & Execution Guide
```

---

## 📷 Report / Evidence Screenshot Guide

For the exam report submission (**`24DCE023_SetA_Report.pdf`**):
1. **Screenshot 1 — React Application**: Open `http://localhost:5173/doctors` displaying loaded doctor cards.
2. **Screenshot 2 — REST API**: Open Postman or browser showing `GET http://localhost:5000/api/v1/doctors` (200 OK).
3. **Screenshot 3 — MongoDB**: Open MongoDB Compass displaying `hospital_db` database and `patients` / `appointments` collection documents.
