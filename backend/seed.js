const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hospital_db";

const initialDoctors = [
    { name: "Dr. Rahul Shah", email: "rahul@example.com", specialisation: "Cardiologist", available: true },
    { name: "Dr. Priya Patel", email: "priya@example.com", specialisation: "Dermatologist", available: true },
    { name: "Dr. Amit Mehta", email: "amit@example.com", specialisation: "Neurologist", available: false },
    { name: "Dr. Sneha Joshi", email: "sneha@example.com", specialisation: "Pediatrician", available: true },
    { name: "Dr. Rajesh Kumar", email: "rajesh@example.com", specialisation: "Orthopedic", available: true },
    { name: "Dr. Ananya Sharma", email: "ananya@example.com", specialisation: "Gynecologist", available: true },
    { name: "Dr. Vikram Verma", email: "vikram@example.com", specialisation: "ENT Specialist", available: false },
    { name: "Dr. Kavita Reddy", email: "kavita@example.com", specialisation: "Ophthalmologist", available: true },
    { name: "Dr. Manish Malhotra", email: "manish@example.com", specialisation: "General Surgeon", available: true },
    { name: "Dr. Deepa Nair", email: "deepa@example.com", specialisation: "Psychiatrist", available: true }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await Patient.deleteMany({});
        await Doctor.deleteMany({});
        await Appointment.deleteMany({});

        // Create 10 Doctors
        const insertedDoctors = await Doctor.insertMany(initialDoctors);
        console.log(`✅ Seeded ${insertedDoctors.length} doctors into MongoDB!`);

        // Create Sample Patients
        const patient1 = await Patient.create({
            name: "John Doe",
            email: "john@example.com",
            phone: "+91-9876543210",
            bloodGroup: "O+",
            age: 32
        });

        const patient2 = await Patient.create({
            name: "Tejas Patel",
            email: "tejas@example.com",
            phone: "+91-9123456789",
            bloodGroup: "B+",
            age: 21
        });

        // Create Sample Appointments with references
        await Appointment.create({
            patientId: patient1._id,
            doctorId: insertedDoctors[0]._id,
            date: "2026-08-25",
            timeSlot: "10:00 AM",
            status: "confirmed",
            reason: "Routine Cardiology Checkup"
        });

        await Appointment.create({
            patientId: patient2._id,
            doctorId: insertedDoctors[1]._id,
            date: "2026-08-26",
            timeSlot: "02:30 PM",
            status: "pending",
            reason: "Skin Consultation"
        });

        console.log("Database seeded successfully with all sample records!");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error.message);
        mongoose.connection.close();
    }
}

seedDatabase();
