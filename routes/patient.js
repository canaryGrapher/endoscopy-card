const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

//importing mongoose models
const Patient = require("../models/Patient");
const Upload = require("../models/Upload");

// @route   GET api/patient/details/:hospital_id
// @desc    Get the patient's details
// @access  Private
router.get("/details/:hospital_id", auth, async (req, res) => {
  try {
    const patientDetails = await Patient.findOne({
      hospitalNo: req.params.hospital_id,
    });
    if (patientDetails) {
      res.status(200).json(patientDetails);
    } else {
      res.status(204).json({ msg: "No patient found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/patient/recommendation
// @desc    Get the recommendation written by the doctor
// @access  Private
router.get("/recommendation/:hospital_id", auth, async (req, res) => {
  try {
    const patientRecommendation = await Upload.findOne({
      hospitalNo: req.params.hospital_id,
    });
    if (patientRecommendation) {
      res.status(200).json({ data: patientRecommendation.recommendation });
    } else {
      res.status(204).json({ msg: "No patient found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/patient/report
// @desc    Get the report written by the doctor
// @access  Private
router.get("/report/:hospital_id", auth, async (req, res) => {
  try {
    const patientReport = await Upload.findOne({
      hospitalNo: req.params.hospital_id,
    });
    if (patientReport) {
      res.status(200).json({ data: patientReport.report });
    } else {
      res.status(204).json({ msg: "No patient found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/patient/scans
// @desc    Get the patient endoscopy scans
// @access  Private
router.get("/scans/:hospital_id", auth, async (req, res) => {
  try {
    res.status(200).json({ msg: "Bla" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
