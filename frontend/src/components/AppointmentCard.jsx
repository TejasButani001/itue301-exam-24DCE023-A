function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
    // Determine CSS class based on status value (confirmed, pending, cancelled)
    const getStatusClass = (statusValue) => {
        switch (statusValue?.toLowerCase()) {
            case "confirmed":
                return "status-confirmed";
            case "cancelled":
                return "status-cancelled";
            case "pending":
            default:
                return "status-pending";
        }
    };

    return (
        <div className="appointment-card">
            <div className="card-header">
                <h3>Patient: {patientName}</h3>
                <span className={`status-badge ${getStatusClass(status)}`}>
                    {status}
                </span>
            </div>
            <div className="card-body">
                <p>
                    <strong>Doctor:</strong> {doctorName}
                </p>
                <p>
                    <strong>Date:</strong> {date}
                </p>
                <p>
                    <strong>Time Slot:</strong> {timeSlot}
                </p>
            </div>
        </div>
    );
}

export default AppointmentCard;
