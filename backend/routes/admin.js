const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const { check, validationResult } = require('express-validator');

//importing mongoose models
const Doctor = require('../models/Doctor')
const Uploads = require('../models/Uploads')
const Data = require('../models/Data')
const Patient = require('../models/Patient')

// @route   POST api/admin/create/doctor
// @desc    Create a new doctor account
// @access  Private
router.post('/create/doctor', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   PUT api/admin/edit/doctor
// @desc    Change doctor details
// @access  Private
router.put('/edit/doctor', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   POST api/admin/create/patient
// @desc    Create a new patient account
// @access  Private
router.post('/create/patient', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   PUT api/admin/edit/patient
// @desc    Change patient details
// @access  Private
router.put('/edit/patient', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   POST api/admin/upload/recommendation
// @desc    Upload recommendation of endoscopy
// @access  Private
router.post('/upload/recommendation', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   POST api/admin/upload/report
// @desc    Upload report of endoscopy
// @access  Private
router.post('/upload/report', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route   POST api/admin/upload/scans
// @desc    Upload scans of endoscopy
// @access  Private
router.post('/upload/scans', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   DELETE api/admin/delete/scan/:scan_id
// @desc    Delete a particular scan from the database
// @access  Private
router.delete('/delete/scan/:scan_id', auth,
    async(req, res) => {
        try {

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)




module.exports = router;