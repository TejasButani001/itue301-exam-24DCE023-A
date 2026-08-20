import { useState, useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";

function BookingPage() {
  // Meaningful individual state values as specified in Task 2
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("Dr. Rahul Shah");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [status, setStatus] = useState("pending");

  // Local list of booked appointments
  const [appointmentsList, setAppointmentsList] = useState([]);

  // Fetch appointments from Express REST API on component mount
  const fetchAppointments = () => {
    fetch("http://localhost:5000/api/v1/appointments")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Format appointments (handling Mongoose populated refs or plain objects)
          const formatted = data.map((item, idx) => ({
            id: item._id || item.id || idx + 1,
            patientName: item.patientName || (item.patientId && item.patientId.name) || "Patient",
            doctorName: item.doctorName || (item.doctorId && item.doctorId.name) || "Doctor",
            date: item.date || "2026-08-20",
            timeSlot: item.timeSlot || "10:00 AM",
            status: item.status || "pending"
          }));
          setAppointmentsList(formatted);
        }
      })
      .catch((err) => {
        console.log("Error loading appointments:", err.message);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // List of 10 available specialist doctors
  const doctorsList = [
    { name: "Dr. Rahul Shah", spec: "Cardiologist" },
    { name: "Dr. Priya Patel", spec: "Dermatologist" },
    { name: "Dr. Amit Mehta", spec: "Neurologist" },
    { name: "Dr. Sneha Joshi", spec: "Pediatrician" },
    { name: "Dr. Rajesh Kumar", spec: "Orthopedic" },
    { name: "Dr. Ananya Sharma", spec: "Gynecologist" },
    { name: "Dr. Vikram Verma", spec: "ENT Specialist" },
    { name: "Dr. Kavita Reddy", spec: "Ophthalmologist" },
    { name: "Dr. Manish Malhotra", spec: "General Surgeon" },
    { name: "Dr. Deepa Nair", spec: "Psychiatrist" }
  ];

  // Handle Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !date) {
      alert("Please fill in patient name and date!");
      return;
    }

    const newAppointment = {
      patientName,
      doctorName,
      date,
      timeSlot,
      status,
      reason: "General Checkup"
    };

    // Optimistically update UI list
    setAppointmentsList([{ id: Date.now(), ...newAppointment }, ...appointmentsList]);

    // Send POST request to Task 3 Express API & MongoDB
    fetch("http://localhost:5000/api/v1/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAppointment)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Appointment saved to MongoDB & server:", data);
        // Refresh full list from server
        fetchAppointments();
      })
      .catch((err) => {
        console.log("Server note:", err.message);
      });

    // Reset inputs
    setPatientName("");
    setDate("");
  };

  return (
    <div className="page-container">
      <h1>Book an Appointment 📋</h1>
      <p className="page-subtitle">Schedule a consultation with MedCare Plus specialist doctors</p>

      <div className="booking-layout">
        {/* Task 2: Appointment Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <h3>Appointment Details</h3>

          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Doctor Name:</label>
            <select
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            >
              {doctorsList.map((doc, idx) => (
                <option key={idx} value={doc.name}>
                  {doc.name} ({doc.spec})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot:</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Submit Appointment
          </button>
        </form>

        {/* Task 2: State Change Display & Live Preview */}
        <div className="booking-preview-panel">
          <div className="live-preview-box">
            <h3>Live Form State Preview</h3>
            <p>
              <strong>Entered patient:</strong>{" "}
              <span className="highlight-text">
                {patientName || "(Type patient name above)"}
              </span>
            </p>
            <p>
              <strong>Selected doctor:</strong>{" "}
              <span className="highlight-text">{doctorName}</span>
            </p>
            <p>
              <strong>Selected date:</strong> {date || "Not selected"}
            </p>
            <p>
              <strong>Time slot:</strong> {timeSlot}
            </p>
          </div>

          <h3>Scheduled Appointments ({appointmentsList.length})</h3>
          <div className="appointment-list">
            {appointmentsList.map((appt) => (
              <AppointmentCard
                key={appt.id}
                patientName={appt.patientName}
                doctorName={appt.doctorName}
                date={appt.date}
                timeSlot={appt.timeSlot}
                status={appt.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
