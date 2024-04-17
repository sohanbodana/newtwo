const mongoose = require('mongoose');
const passport = require('passport');

// Define Admin schema
const adminSchema = new mongoose.Schema({
    AdminID: {
        type: Number,
        required: true,
        unique: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});
const Admin = mongoose.model('Admin', adminSchema);

// Define Bookings schema
const bookingSchema = new mongoose.Schema({
    PNR: {
        type: Number,
    },
    name: String,
    age: Number,
    gender: String,
    address: String,
    state: String,
    email: String,
    contact: String,
    fclass: String
});
const Booking = mongoose.model('bookings', bookingSchema);

// Define Contactus schema
const contactusSchema = new mongoose.Schema({
    IDS: {
        type: Number,
    },
    NAME: String,
    EMAIL: String,
    CONTACT_NO: String,
    MESSAGE: String
});
const Contactus = mongoose.model('contactus', contactusSchema);

// Define Flightshow schema
const flightshowSchema = new mongoose.Schema({
    FID: {
        type: String,
        required: true,
        unique: true
    },
    AIRLINE: String,
    DepartTime: String,
    ArrivalTime: String,
    Origin: String,
    Destination: String,
    FirstClass: Number,
    BusinessClass: Number,
    PremiumEconomyClass: Number,
    EconomyClass: Number
});
const Flightshow = mongoose.model('flightshows', flightshowSchema);

// Define Search schema
const searchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    fid: {
        type: Number,
        required: true
    },
    airline: String,
    departime: String,
    arrivaltime: String,
    origin: String,
    destination: String,
    price: Number
});
const Search = mongoose.model('Search', searchSchema);

// Define Signup schema
const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
      iv: String,
      encryptedData: String
    },
    PNR: [{ type: Number}], // Array of PNRs
    contact: { type: String }
});
const Signup = mongoose.model('signups', signupSchema);


// Define Ticket schema
const ticketSchema = new mongoose.Schema({
    PNR: {
        type: Number,
    },
    name: String,
    age: Number,
    email: String,
    contact: String,
    FID: String,
    AIRLINE: String,
    DepartTime: String,
    ArrivalTime: String,
    Origin: String,
    Destination: String,
    fclass: String,
    flight_duration: Date,
    FDate: Date
});
const Ticket = mongoose.model('tickets', ticketSchema);



// Define User schema
const userSchema = new mongoose.Schema({
    PNR: {
        type: Number,
        required: true,
        unique: true
    },
    Name: String,
    Age: Number,
    Gender: String,
    Address: String,
    State: String,
    Mail: String,
    Contact: String,
    Class: String
});
const User = mongoose.model('users', userSchema);


// Export all models
module.exports = {
    Admin,
    Booking,
    Contactus,
    Flightshow,
    Search,
    Signup,
    Ticket,
    User
};
