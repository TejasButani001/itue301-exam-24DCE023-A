# Hospital Appointment System (MedCare Plus)

ITUE301 — Advanced Web Development Frameworks  
Open-Book Practical Examination — Set A

---

## 📌 Project Overview
MedCare Plus is a full-stack Hospital Appointment System built using **React**, **Express.js**, and **MongoDB (Mongoose)**. It allows patients to view specialist doctors, schedule appointments, track status (`confirmed`, `pending`, `cancelled`), and manage healthcare records.

---

## 🚀 Setup & Execution Instructions

### 1. Environment Configuration (`.env`)
Create a `.env` file in the root directory (refer to `.env.example`):
```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
PORT=5000
```

### 2. Backend Setup & Run Command
Navigate to the `backend/` directory:
```bash
cd backend
npm install
node server.js
# OR
npm start
```
The Express backend server runs on `http://localhost:5000`.

### 3. Frontend Setup & Run Command
Navigate to the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```
The React frontend application runs on `http://localhost:5173`.

### 4. MongoDB Setup
1. Start local MongoDB instance or use MongoDB Atlas.
2. Update `MONGO_URI` in `.env` with your MongoDB connection string.
3. Database schemas for `Patient`, `Doctor`, and `Appointment` are automatically initialized by Mongoose upon backend server start.

---

## 🛠️ Data Entities & API Endpoints

### Data Entities
- **Patient**: `name`, `email` (unique), `phone`, `bloodGroup` (Enum), `age`
- **Doctor**: `name`, `email`, `specialisation`, `available` (Boolean)
- **Appointment**: `patientId` (ref), `doctorId` (ref), `date`, `timeSlot`, `status` (`pending`, `confirmed`, `cancelled`), `reason` (max 300 chars)

### REST API Endpoints
- `GET /api/v1/doctors` — Returns all available specialist doctors (HTTP 200)
- `GET /api/v1/appointments` — Returns all appointments (HTTP 200)
- `POST /api/v1/appointments` — Creates a new appointment (HTTP 201)
- `POST /api/v1/db/patients` — Create patient in MongoDB with schema validation
- `POST /api/v1/test-validation` — Test Mongoose schema validation failure handling (HTTP 400)

---

## 📋 Task Highlights
- **Task 1 (React Components)**: Modular architecture (`HomePage`, `DoctorsPage`, `BookingPage`, `AppointmentCard`, `Navbar`). Status badges dynamically colored based on props.
- **Task 2 (Routing & State)**: React Router links navigation and interactive appointment booking form with live state preview.
- **Task 3 (Express & Middleware)**: Custom `requestLogger` middleware logging `[METHOD] [PATH] [TIMESTAMP]`, CORS support, and global error handling returning structured JSON responses.
- **Task 4 (API Consumption)**: Asynchronous `useEffect` fetching from Express backend in `DoctorsPage` with `data`, `loading`, and `error` state management.
- **Task 5 (MongoDB Validation)**: Mongoose schemas with ObjectId references, enums, required fields, and structured error responses on validation failures.
