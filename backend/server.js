const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Mongoose Models (Task 5)
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// ==========================================
// Task 3: Custom Request Logger Middleware
// ==========================================
function requestLogger(req, res, next) {
    const method = req.method;
    const path = req.path;
    const timestamp = new Date().toISOString();

    console.log(`[${method}] [${path}] [${timestamp}]`);
    next();
}

// Apply request logger globally
app.use(requestLogger);

// ==========================================
// Task 3: Temporary In-Memory Data Arrays
// ==========================================
let appointments = [
    {
        id: 1,
        patientName: "John Doe",
        doctorName: "Dr. Rahul Shah",
        date: "2026-08-25",
        timeSlot: "10:00 AM",
        status: "confirmed",
        reason: "Routine Cardiology Checkup"
    },
    {
        id: 2,
        patientName: "Alice Smith",
        doctorName: "Dr. Priya Patel",
        date: "2026-08-26",
        timeSlot: "02:30 PM",
        status: "pending",
        reason: "Skin Consultation"
    }
];

const doctors = [
    { id: 1, name: "Dr. Rahul Shah", email: "rahul@example.com", specialisation: "Cardiologist", available: true },
    { id: 2, name: "Dr. Priya Patel", email: "priya@example.com", specialisation: "Dermatologist", available: true },
    { id: 3, name: "Dr. Amit Mehta", email: "amit@example.com", specialisation: "Neurologist", available: false },
    { id: 4, name: "Dr. Sneha Joshi", email: "sneha@example.com", specialisation: "Pediatrician", available: true },
    { id: 5, name: "Dr. Rajesh Kumar", email: "rajesh@example.com", specialisation: "Orthopedic", available: true },
    { id: 6, name: "Dr. Ananya Sharma", email: "ananya@example.com", specialisation: "Gynecologist", available: true },
    { id: 7, name: "Dr. Vikram Verma", email: "vikram@example.com", specialisation: "ENT Specialist", available: false },
    { id: 8, name: "Dr. Kavita Reddy", email: "kavita@example.com", specialisation: "Ophthalmologist", available: true },
    { id: 9, name: "Dr. Manish Malhotra", email: "manish@example.com", specialisation: "General Surgeon", available: true },
    { id: 10, name: "Dr. Deepa Nair", email: "deepa@example.com", specialisation: "Psychiatrist", available: true }
];

// ==========================================
// Task 5: Connect MongoDB via Mongoose
// ==========================================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hospital_db";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.log("MongoDB Connection Note: Running with in-memory store fallback if MongoDB service is offline.");
    });

// ==========================================
// Task 3 Endpoints: REST API (In-Memory / DB)
// ==========================================

// 1. GET /api/v1/appointments - Return all appointments (HTTP 200)
app.get("/api/v1/appointments", async (req, res, next) => {
    try {
        // If MongoDB is connected, return database appointments merged with in-memory
        if (mongoose.connection.readyState === 1) {
            const dbAppointments = await Appointment.find().populate("patientId doctorId");
            if (dbAppointments.length > 0) {
                return res.status(200).json(dbAppointments);
            }
        }
        res.status(200).json(appointments);
    } catch (err) {
        next(err);
    }
});

// 2. POST /api/v1/appointments - Create a new appointment (HTTP 201)
app.post("/api/v1/appointments", async (req, res, next) => {
    try {
        const { patientName, doctorName, date, timeSlot, status, reason } = req.body;

        const newAppointment = {
            id: appointments.length + 1,
            patientName: patientName || "Guest Patient",
            doctorName: doctorName || "Dr. Rahul Shah",
            date: date || new Date().toISOString().split("T")[0],
            timeSlot: timeSlot || "10:00 AM",
            status: status || "pending",
            reason: reason || "General Checkup"
        };

        appointments.push(newAppointment);

        // If MongoDB is connected, save Patient and Appointment into MongoDB database
        if (mongoose.connection.readyState === 1) {
            try {
                // Find or create Patient
                const emailSlug = (patientName || "patient").toLowerCase().replace(/[^a-z0-9]/g, "") + "@example.com";
                let patientDoc = await Patient.findOne({ name: patientName });
                if (!patientDoc) {
                    patientDoc = await Patient.create({
                        name: patientName || "Guest Patient",
                        email: emailSlug,
                        phone: "+91-9876543210",
                        bloodGroup: "O+",
                        age: 25
                    });
                }

                // Find Doctor or fallback to first doctor
                let doctorDoc = await Doctor.findOne({ name: doctorName });
                if (!doctorDoc) {
                    doctorDoc = await Doctor.findOne();
                }

                if (doctorDoc) {
                    await Appointment.create({
                        patientId: patientDoc._id,
                        doctorId: doctorDoc._id,
                        date: newAppointment.date,
                        timeSlot: newAppointment.timeSlot,
                        status: newAppointment.status,
                        reason: newAppointment.reason
                    });
                    console.log("✅ Saved Appointment & Patient to MongoDB!");
                }
            } catch (dbErr) {
                console.log("DB save note:", dbErr.message);
            }
        }

        res.status(201).json({
            message: "Appointment created successfully",
            appointment: newAppointment
        });
    } catch (err) {
        next(err);
    }
});

// 3. GET /api/v1/doctors - Return all doctors (HTTP 200)
app.get("/api/v1/doctors", async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const dbDoctors = await Doctor.find();
            if (dbDoctors.length > 0) {
                return res.status(200).json(dbDoctors);
            }
        }
        res.status(200).json(doctors);
    } catch (err) {
        next(err);
    }
});

// 4. GET /api/v1/appointments/:id - READ single appointment by ID
app.get("/api/v1/appointments/:id", async (req, res, next) => {
    try {
        const apptId = req.params.id;
        const appt = appointments.find((a) => a.id == apptId);
        if (!appt) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.status(200).json(appt);
    } catch (err) {
        next(err);
    }
});

// 5. PUT /api/v1/appointments/:id - UPDATE appointment by ID
app.put("/api/v1/appointments/:id", async (req, res, next) => {
    try {
        const apptId = req.params.id;
        const index = appointments.findIndex((a) => a.id == apptId);
        if (index === -1) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        // Update fields
        appointments[index] = {
            ...appointments[index],
            ...req.body
        };

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: appointments[index]
        });
    } catch (err) {
        next(err);
    }
});

// 6. DELETE /api/v1/appointments/:id - DELETE appointment by ID
app.delete("/api/v1/appointments/:id", async (req, res, next) => {
    try {
        const apptId = req.params.id;
        const index = appointments.findIndex((a) => a.id == apptId);
        if (index === -1) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        const deletedAppt = appointments.splice(index, 1)[0];
        res.status(200).json({
            message: "Appointment deleted successfully",
            appointment: deletedAppt
        });
    } catch (err) {
        next(err);
    }
});

// ==========================================
// Task 5 Endpoints: MongoDB Mongoose Operations & Validation Testing
// ==========================================

// Create Patient in MongoDB
app.post("/api/v1/db/patients", async (req, res, next) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json({
            success: true,
            data: savedPatient
        });
    } catch (err) {
        next(err);
    }
});

// Create Doctor in MongoDB
app.post("/api/v1/db/doctors", async (req, res, next) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json({
            success: true,
            data: savedDoctor
        });
    } catch (err) {
        next(err);
    }
});

// Create Appointment with References in MongoDB
app.post("/api/v1/db/appointments", async (req, res, next) => {
    try {
        const newAppt = new Appointment(req.body);
        const savedAppt = await newAppt.save();
        res.status(201).json({
            success: true,
            data: savedAppt
        });
    } catch (err) {
        next(err);
    }
});

// Endpoint specifically to demonstrate Mongoose validation failure testing
app.post("/api/v1/test-validation", async (req, res, next) => {
    try {
        // Intentionally validate sample payload to test validation rules
        const samplePatient = new Patient(req.body);
        await samplePatient.validate(); // Triggers Mongoose schema validation
        res.status(200).json({
            success: true,
            message: "Validation passed!"
        });
    } catch (err) {
        next(err);
    }
});

// ==========================================
// Task 3: Global Error-Handling Middleware
// ==========================================
app.use((err, req, res, next) => {
    console.error("Global Error Caught:", err.message);

    // Handle Mongoose Schema Validation Errors gracefully (Task 5)
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            errorType: "ValidationError",
            message: "Validation Failed",
            errors: errors
        });
    }

    // Handle MongoDB Duplicate Key Error (e.g. unique email)
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            errorType: "DuplicateKeyError",
            message: "Duplicate field value entered. Email must be unique."
        });
    }

    // Default 500 Server Error response
    res.status(500).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
});

// ==========================================
// Start Express Server
// ==========================================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});