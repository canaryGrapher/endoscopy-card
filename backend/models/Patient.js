const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    hospitalNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: "NA",
        required: false
    },
    sex: {
        type: String,
        required: true
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);