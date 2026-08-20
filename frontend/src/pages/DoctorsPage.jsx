import { useEffect, useState } from "react";

function DoctorsPage() {
    // Maintain three states as required by Task 4: data, loading, error
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Asynchronous API fetch pattern on component mount using useEffect
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/doctors")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch doctors from API");
                }
                return response.json();
            })
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 1. Display loading message while request is in progress
    if (loading) {
        return (
            <div className="page-container loading-container">
                <div className="spinner"></div>
                <h2>Loading doctors list...</h2>
            </div>
        );
    }

    // 2. Display error message if request fails
    if (error) {
        return (
            <div className="page-container error-container">
                <h2>⚠️ Error Loading Doctors</h2>
                <p>{error}</p>
                <p className="hint">Make sure the Express backend server is running on port 5000.</p>
            </div>
        );
    }

    // 3 & 4. Display doctor data after successful request (Name, Specialisation, Availability)
    return (
        <div className="page-container">
            <h1>Our Specialist Doctors 👨‍⚕️</h1>
            <p className="page-subtitle">Select a specialist and schedule your medical consultation</p>

            <div className="doctors-grid">
                {data.map((doctor) => (
                    <div key={doctor.id || doctor._id} className="doctor-card">
                        <div className="doctor-header">
                            <h3>{doctor.name}</h3>
                            <span className={`availability-badge ${doctor.available ? "available" : "unavailable"}`}>
                                {doctor.available ? "● Available" : "○ Not Available"}
                            </span>
                        </div>

                        <div className="doctor-details">
                            <p>
                                <strong>Specialisation:</strong> {doctor.specialisation}
                            </p>
                            {doctor.email && (
                                <p>
                                    <strong>Email:</strong> {doctor.email}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorsPage;