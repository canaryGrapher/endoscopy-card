const mongoose = require('mongoose');

const UploadsSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    scans: [{
        scanName: {
            type: String,
            required: true
        },
        scanTime: {
            type: Date,
            default: Date.now,
            required: true
        },
        uploadTime: {
            type: Date,
            default: Date.now,
        }
    }]
});

module.exports = Upload = mongoose.model('upload', UploadsSchema);