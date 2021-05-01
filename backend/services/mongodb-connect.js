const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB is now connected');
    } catch (err) {
        console.log("There was an error connecting to the database.")
        console.error(err.message);
        // Exits the process with failure
        process.exit(1);
    }
};

module.exports = connectDB;