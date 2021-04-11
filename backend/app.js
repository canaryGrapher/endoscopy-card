const express = require('express');
const bodyParser = require('body-parser');

//making use of environment variables
const env = require('dotenv').config()

//importing modules
const connectDB = require('./services/mongodb-connect');

//defining global variables
const PORT = process.env.PORT || 3002;


//conncting to services
const app = express();
connectDB();

//using middleware in express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//testing endpoint
app.get('/', (req, res) => {
    return res.status(200).json({
        msg: "We are glad you like experimenting, but there's nothing here",
        live: true
    });
});

app.get('*', (req, res) => {
    return res.status(404).json({ msg: 'There is nothing to see here' });
});


//starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});