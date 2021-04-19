const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const { check, validationResult } = require('express-validator');

//importing mongoose models
const Patient = require('../models/Patient')
const Uploads = require('../models/Uploads')
const Data = require('../models/Data')


// @route   GET api/patient/details
// @desc    Get the patient's details
// @access  Private
router.get('/details', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)


// @route   GET api/patient/recommendation
// @desc    Get the recommendation written by the doctor
// @access  Private
router.get('/recommendation', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   GET api/patient/report
// @desc    Get the report written by the doctor
// @access  Private
router.get('/report', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   GET api/patient/scans
// @desc    Get the patient endoscopy scans
// @access  Private
router.get('/scans', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)


module.exports = router;