const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const { check, validationResult } = require('express-validator');

//importing mongoose models
const Doctor = require('../models/Doctor')

// @route   GET api/doctor/details
// @desc    Get the doctor's details
// @access  Private
router.get('/details', auth,
    async(req, res) => {
        try {
            //find the details of the doctor in the database using the provided email
            const doctorDetails = await Doctor.findById(req.body.email);
            res.json(doctorDetails)
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route   POST api/doctor/login
// @desc    Verify the credentials and authenticate the user
// @access  Private
router.get('/login', [
        check('email', 'Email is required').not().isEmpty(),
        check('token', 'Token is required').not().isEmpty()
    ],
    async(req, res) => {
        try {
            //code to validate the google token and the username and add it to Redis-server
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)


module.exports = router;