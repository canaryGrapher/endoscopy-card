const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//configuration file for multer
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
const Upload = require("../models/Upload");
const Patient = require("../models/Patient");
const { update } = require("../models/Doctor");

// @route   POST api/admin/create/doctor
// @desc    Create a new doctor account
// @access  Private
router.post(
  "/create/doctor",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Email is required")
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail(),
      check("hospital", "Hospital name is required").not().isEmpty(),
      check("image", "Image link is required").not(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, hospital, image } = req.body;
    try {
      //creating an object to be added to the database
      const doctorDetails =
        image === ""
          ? {
              name: name,
              email: email,
              hospital: hospital,
            }
          : {
              name: name,
              email: email,
              hospital: hospital,
              image: image,
            };
      const doctor = new Doctor(doctorDetails);
      const saveInfo = await doctor.save();
      //strip information from the response object
      const sendData = {
        _id: saveInfo._id,
        name: saveInfo.name,
        email: saveInfo.email,
        hospital: saveInfo.hospital,
        image: saveInfo.image,
      };
      res
        .status(201)
        .json({ msg: "Added doctor to the database.", data: sendData });
    } catch (error) {
      //checking if the error was a duplcation error
      if (error.name === "MongoError") {
        if (error.code === 11000) {
          res.status(409).json({ msg: "Entry already exists" });
        } else {
          res.status(500).json({ msg: "Database error, try again" });
        }
      }
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/admin/edit/doctor
// @desc    Change doctor details
// @access  Private
router.put("/edit/doctor", auth, async (req, res) => {
  const { email, name, hospital, image } = req.body;
  try {
    console.log(email, name, hospital, image);
    const newData = {};
    if (email) newData.email = email;
    if (name) newData.name = name;
    if (hospital) newData.hospital = hospital;
    if (image) newData.image = image;
    const doctor = await Doctor.findById(req.user.id);
    if (doctor) {
      const doctorUpdate = await Doctor.findOneAndUpdate(
        { _id: req.user.id },
        { $set: newData },
        { new: true }
      );
      res.status(200).json(doctorUpdate);
    }
    res.status(200).json({ msg: "Nothing to update" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/admin/create/patient
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
      wfs.mkdir(`${hospital_no}`, function (err) {
        if (err) throw err;
      });
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

// @route   PUT api/admin/edit/patient/:hospital_id
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

// @route   PUT api/admin/upload/recommendation/:hospital_id
// @desc    Upload recommendation of endoscopy
// @access  Private
router.put(
  "/upload/recommendation/:hospital_id",
  [
    auth,
    [
      check("recommendation", "Recommendation is required")
        .not()
        .isEmpty()
        .trim(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { recommendation } = req.body;
    try {
      const uploadedRecommendation = await Upload.findOneAndUpdate(
        { hospitalNo: req.params.hospital_id },
        { $set: { recommendation: recommendation } },
        { new: false }
      );
      res.status(200).json({
        data: uploadedRecommendation.recommendation,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/admin/upload/report/:hospital_id
// @desc    Upload report of endoscopy
// @access  Private
router.put(
  "/upload/report/:hospital_id",
  [auth, [check("report", "Report is required").not().isEmpty().trim()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { report } = req.body;
    try {
      const uploadedReport = await Upload.findOneAndUpdate(
        { hospitalNo: req.params.hospital_id },
        { $set: { report: report } },
        { new: false }
      );
      res.status(200).json({
        data: uploadedReport.report,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/admin/upload/scans/:hospital_id
// @desc    Upload scans of endoscopy
// @access  Private
router.post(
  "/upload/scans/:hospital_id",
  [
    auth,
    [
      check("scanName", "Please provide a name for this file").not().isEmpty(),
      check("scanTime", "Please provide the time this scan was done")
        .not()
        .isEmpty(),
    ],
    upload.single("file"),
  ],
  async (req, res) => {
    try {
      //check if there was error in upload
      if (!upload.err) {
        //check if the request has an image or not
        if (!req.file || req.file.length === 0 || req.file.length > 5) {
          res.json({
            success: false,
            message: "You must provide at least 1 file",
          });
        } else {
          let patientUpload = await Upload.findOne({
            hospitalNo: req.params.hospital_id,
          });

          //check if the patient exists in the database
          if (patientUpload) {
            const fileObject = {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            };
            const newScanUpload = {
              scanName: req.body.scanName,
              scanTime: req.body.scanTime,
              file: fileObject,
            };
            const newFileObject = patientUpload.scans.unshift(newScanUpload);
            const fileUpload = {
              ...patientUpload,
              scans: newFileObject,
              numberOfUploads: newFileObject.length,
            };
            const doctorUpdate = await Upload.findOneAndUpdate(
              { hospitalNo: req.params.hospital_id },
              { $set: fileUpload },
              { new: false }
            );
            console.log(doctorUpdate);
            res.status(200).json({ msg: "File Uploaded" });
          } else {
            res
              .status(400)
              .json({ msg: "That patient does not exist in the database" });
          }
        }
      } else {
        throw "Error in Processing the file";
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/admin/delete/scan/:hospital_id/:scan_id
// @desc    Delete a particular scan from the database
// @access  Private
router.delete("/delete/scan/:hospital_id/:scan_id", auth, async (req, res) => {
  try {
    const patient = await Upload.findOne({
      hospitalNo: req.params.hospital_id,
    });

    //search for the scan and remove it if it matches
    const filteredArray = patient.scans.filter((scan) => {
      return scan._id != req.params.scan_id;
    });
    // altering the object if the scan_id patched
    if (filteredArray.length != patient.scans.length) {
      const newUploadObject = {
        scans: filteredArray,
        numberOfUploads: filteredArray.length,
      };
      const updatedList = await Upload.findOneAndUpdate(
        { hospitalNo: req.params.hospital_id },
        newUploadObject
      );
      res.status(200).json({ msg: "Scan Deleted" });
    } else {
      res.status(200).json({ msg: "File not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
