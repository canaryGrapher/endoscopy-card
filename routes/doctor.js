const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//array containing Country names
const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo (the Democratic Republic of the)",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands [Malvinas]",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States Minor Outlying Islands",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];
//array containing genders
const GenderArray = ["MALE", "FEMALE", "OTHER"];

//importing mongoose models
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

// @route   GET api/doctor/details
// @desc    Get the doctor's details
// @access  Private
router.get("/details", auth, async (req, res) => {
  try {
    //find the details of the doctor in the database using the provided email
    const doctorDetails = await Doctor.findById(req.user.email);
    if (doctorDetails) {
      res.status(200).json(doctorDetails);
    } else {
      res.status(204).json({ msg: "No user found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/doctor/login
// @desc    Verify the credentials and authenticate the user
// @access  Private
router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("token", "Token is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //code to validate the google token and the username and add it to Redis-server
      res.status(200).json({ msg: "Login Successful" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/doctor/create/patient
// @desc    Create a new patient account
// @access  Private
router.post(
  "/create/patient",
  [
    auth,
    [
      check("hospital_no", "Hospital number is necessary").not().isEmpty(),
      check("patient_name", "Patient name is necesary").not().isEmpty().trim(),
      check("date_of_birth", "Patient name is necesary").not().isEmpty(),
      check("sex", "Enter a valid gender").not().isEmpty().isIn(GenderArray),
      check("address", "Address is required").not().isEmpty().trim(),
      check("mobile_no", "Phone Number is required").not().isEmpty(),
      check("email", "Invalid email address").isEmail().normalizeEmail(),
      check("country", "Enter a valid country")
        .not()
        .isEmpty()
        .isIn(countryList),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      hospital_no,
      patient_name,
      date_of_birth,
      sex,
      address,
      mobile_no,
      email,
      country,
    } = req.body;

    try {
      const PatientDetails = {
        hospitalNo: hospital_no,
        name: patient_name,
        dob: date_of_birth,
        sex: sex,
        mobile: mobile_no,
        email: email,
        address: address,
        country: country,
      };
      const patient = new Patient(PatientDetails);
      const saveInfo = await patient.save();
      const newDataLink = new Upload({ hospitalNo: hospital_no });
      await newDataLink.save();
      res
        .status(201)
        .json({ msg: "Added patient to the database.", data: saveInfo });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        res.status(409).json({ msg: "Entry already exists" });
      } else {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

// @route   PUT api/doctor/edit/patient/:hospital_id
// @desc    Change patient details
// @access  Private
router.put(
  "/edit/patient/:hospital_id",
  [
    auth,
    [
      check("sex", "Inavlid Gender type").isIn(["MALE", "FEMALE", "OTHER"]),
      check("country", "Enter a valid country").isIn(countryList),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      patient_name,
      date_of_birth,
      sex,
      address,
      mobile_no,
      email,
      country,
    } = req.body;
    try {
      let UpdatedPatient = {};
      if (patient_name) UpdatedPatient.name = patient_name;
      if (date_of_birth) UpdatedPatient.dob = date_of_birth;
      if (sex) UpdatedPatient.sex = sex;
      if (address) UpdatedPatient.address = address;
      if (mobile_no) UpdatedPatient.mobile = mobile_no;
      if (email) UpdatedPatient.email = email;
      if (country) UpdatedPatient.country = country;

      const patient = await Patient.findOne({
        hospitalNo: req.params.hospital_id,
      });
      if (patient) {
        const patientUpdate = await Patient.findOneAndUpdate(
          { hospitalNo: req.params.hospital_id },
          { $set: UpdatedPatient },
          { new: true }
        );
        res.status(200).json(patientUpdate);
      } else {
        res.status(200).json({ msg: "Nothing to update" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
