const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    recommendation: {
        type: String,
        default: null
    },
    report: {
        type: String,
        default: null
    }
});

module.exports = Data = mongoose.model('data', DataSchema);