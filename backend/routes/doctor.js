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

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)


module.exports = router;