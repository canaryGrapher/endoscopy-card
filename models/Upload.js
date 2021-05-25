const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  hospitalNo: {
    type: String,
    required: true,
    unique: true,
  },
  recommendation: {
    type: String,
    default: null,
  },
  report: {
    type: String,
    default: null,
  },
  numberOfUploads: {
    type: Number,
    default: 0,
  },
  scans: [
    {
      scanName: {
        type: String,
        required: true,
      },
      scanTime: {
        type: Date,
        default: Date.now,
        required: true,
      },
      uploadTime: {
        type: Date,
        default: Date.now,
      },
      file: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
});

module.exports = Upload = mongoose.model("upload", UploadSchema);
