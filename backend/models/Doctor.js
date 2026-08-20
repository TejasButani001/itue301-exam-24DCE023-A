const mongoose = require("mongoose");

// Doctor Schema definition
const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Doctor name is required"]
        },
        email: {
            type: String
        },
        specialisation: {
            type: String,
            required: [true, "Doctor specialisation is required"]
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
