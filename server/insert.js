const mongoose = require('mongoose');

// Define schema for flight data
const flightSchema = new mongoose.Schema({
    FID: Number,
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

// Create Flight model based on schema
const Flight = mongoose.model('flightshows', flightSchema);

// MongoDB connection URL
const mongoURI = 'mongodb+srv://deepakbodana100:12243648sS@cluster0.jiyyvda.mongodb.net/airfly';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Insert all flight data into flightshow collection
        Flight.insertMany(flightDataArray)
            .then(() => {
                console.log('Flight data inserted successfully');
            })
            .catch(err => {
                console.error('Error inserting flight data:', err);
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


const flightDataArray = [
    { 
        FID: 1005,
        AIRLINE: "Vistara",
        DepartTime: "10:03:00",
        ArrivalTime: "12:00:00",
        Origin: "Mumbai",
        Destination: "Ahemdabad",
        FirstClass: 7870,
        BusinessClass: 6596,
        PremiumEconomyClass: 3681,
        EconomyClass: 2566
    },
    { 
        FID: 1007,
        AIRLINE: "Air India",
        DepartTime: "11:16:00",
        ArrivalTime: "03:05:00",
        Origin: "Indore",
        Destination: "Surat",
        FirstClass: 11473,
        BusinessClass: 10565,
        PremiumEconomyClass: 5256,
        EconomyClass: 6876
    },
    { 
        FID: 1008,
        AIRLINE: "Spice jet",
        DepartTime: "03:33:00",
        ArrivalTime: "09:55:00",
        Origin: "Hyderabad",
        Destination: "Banglore",
        FirstClass: 9150,
        BusinessClass: 8696,
        PremiumEconomyClass: 3681,
        EconomyClass: 2934
    },
    { 
        FID: 1009,
        AIRLINE: "Air Bharat",
        DepartTime: "06:04:00",
        ArrivalTime: "06:39:00",
        Origin: "Ujjain",
        Destination: "Indore",
        FirstClass: 5473,
        BusinessClass: 4265,
        PremiumEconomyClass: 3256,
        EconomyClass: 2876
    },
    { 
        FID: 1010,
        AIRLINE: "GoAir",
        DepartTime: "08:45:00",
        ArrivalTime: "11:20:00",
        Origin: "Chennai",
        Destination: "Mumbai",
        FirstClass: 7845,
        BusinessClass: 6320,
        PremiumEconomyClass: 4895,
        EconomyClass: 3987
    },
    { 
        FID: 1012,
        AIRLINE: "Air Asia",
        DepartTime: "12:30:00",
        ArrivalTime: "02:45:00",
        Origin: "Jaipur",
        Destination: "Lucknow",
        FirstClass: 6780,
        BusinessClass: 5215,
        PremiumEconomyClass: 4523,
        EconomyClass: 3569
    },
    { 
        FID: 1013,
        AIRLINE: "Air Vistara",
        DepartTime: "09:15:00",
        ArrivalTime: "11:30:00",
        Origin: "Kolkata",
        Destination: "Delhi",
        FirstClass: 9500,
        BusinessClass: 7500,
        PremiumEconomyClass: 5500,
        EconomyClass: 3500
    },
    { 
        FID: 1014,
        AIRLINE: "Air India Express",
        DepartTime: "13:00:00",
        ArrivalTime: "16:45:00",
        Origin: "Chandigarh",
        Destination: "Goa",
        FirstClass: 8800,
        BusinessClass: 6800,
        PremiumEconomyClass: 4800,
        EconomyClass: 2800
    },
    { 
        FID: 1015,
        AIRLINE: "GoAir",
        DepartTime: "14:45:00",
        ArrivalTime: "17:30:00",
        Origin: "Pune",
        Destination: "Ahmedabad",
        FirstClass: 8200,
        BusinessClass: 6200,
        PremiumEconomyClass: 4200,
        EconomyClass: 2200
    },
    { 
        FID: 1016,
        AIRLINE: "Air Asia India",
        DepartTime: "17:00:00",
        ArrivalTime: "19:15:00",
        Origin: "Bhopal",
        Destination: "Jaipur",
        FirstClass: 7700,
        BusinessClass: 5700,
        PremiumEconomyClass: 3700,
        EconomyClass: 1700
    },
    { 
        FID: 1017,
        AIRLINE: "SpiceJet",
        DepartTime: "20:30:00",
        ArrivalTime: "23:15:00",
        Origin: "Vadodara",
        Destination: "Kochi",
        FirstClass: 9000,
        BusinessClass: 7000,
        PremiumEconomyClass: 5000,
        EconomyClass: 3000
    },
    { 
        FID: 1018,
        AIRLINE: "Air India",
        DepartTime: "09:30:00",
        ArrivalTime: "12:15:00",
        Origin: "Guwahati",
        Destination: "Mumbai",
        FirstClass: 9500,
        BusinessClass: 7500,
        PremiumEconomyClass: 5500,
        EconomyClass: 3500
    },
    { 
        FID: 1019,
        AIRLINE: "Vistara",
        DepartTime: "12:45:00",
        ArrivalTime: "15:30:00",
        Origin: "Coimbatore",
        Destination: "Kolkata",
        FirstClass: 8800,
        BusinessClass: 6800,
        PremiumEconomyClass: 4800,
        EconomyClass: 2800
    },
    { 
        FID: 1020,
        AIRLINE: "GoAir",
        DepartTime: "16:00:00",
        ArrivalTime: "18:45:00",
        Origin: "Ahmedabad",
        Destination: "Chennai",
        FirstClass: 9200,
        BusinessClass: 7200,
        PremiumEconomyClass: 5200,
        EconomyClass: 3200
    },
    { 
        FID: 1021,
        AIRLINE: "IndiGo",
        DepartTime: "08:30:00",
        ArrivalTime: "11:15:00",
        Origin: "Delhi",
        Destination: "Bangalore",
        FirstClass: 9200,
        BusinessClass: 7200,
        PremiumEconomyClass: 5200,
        EconomyClass: 3200
    },
    { 
        FID: 1022,
        AIRLINE: "Air Asia India",
        DepartTime: "12:00:00",
        ArrivalTime: "14:45:00",
        Origin: "Mumbai",
        Destination: "Chennai",
        FirstClass: 8500,
        BusinessClass: 6500,
        PremiumEconomyClass: 4500,
        EconomyClass: 2500
    },
    { 
        FID: 1023,
        AIRLINE: "Vistara",
        DepartTime: "15:30:00",
        ArrivalTime: "18:15:00",
        Origin: "Kolkata",
        Destination: "Hyderabad",
        FirstClass: 9800,
        BusinessClass: 7800,
        PremiumEconomyClass: 5800,
        EconomyClass: 3800
    },
    { 
        FID: 1024,
        AIRLINE: "GoAir",
        DepartTime: "19:00:00",
        ArrivalTime: "21:45:00",
        Origin: "Chandigarh",
        Destination: "Lucknow",
        FirstClass: 8900,
        BusinessClass: 6900,
        PremiumEconomyClass: 4900,
        EconomyClass: 2900
    },
    { 
        FID: 1025,
        AIRLINE: "SpiceJet",
        DepartTime: "22:30:00",
        ArrivalTime: "01:15:00",
        Origin: "Jaipur",
        Destination: "Pune",
        FirstClass: 8200,
        BusinessClass: 6200,
        PremiumEconomyClass: 4200,
        EconomyClass: 2200
    },
    { 
        FID: 1026,
        AIRLINE: "Air India Express",
        DepartTime: "03:00:00",
        ArrivalTime: "05:45:00",
        Origin: "Ahmedabad",
        Destination: "Guwahati",
        FirstClass: 9400,
        BusinessClass: 7400,
        PremiumEconomyClass: 5400,
        EconomyClass: 3400
    },
    { 
        FID: 1027,
        AIRLINE: "Air Bharat",
        DepartTime: "06:30:00",
        ArrivalTime: "09:15:00",
        Origin: "Indore",
        Destination: "Nagpur",
        FirstClass: 8600,
        BusinessClass: 6600,
        PremiumEconomyClass: 4600,
        EconomyClass: 2600
    },
    { 
        FID: 1028,
        AIRLINE: "Air Asia",
        DepartTime: "10:00:00",
        ArrivalTime: "12:45:00",
        Origin: "Surat",
        Destination: "Bhopal",
        FirstClass: 9000,
        BusinessClass: 7000,
        PremiumEconomyClass: 5000,
        EconomyClass: 3000
    },
    { 
        FID: 1029,
        AIRLINE: "SpiceJet",
        DepartTime: "13:30:00",
        ArrivalTime: "16:15:00",
        Origin: "Varanasi",
        Destination: "Ranchi",
        FirstClass: 8300,
        BusinessClass: 6300,
        PremiumEconomyClass: 4300,
        EconomyClass: 2300
    },
    { 
        FID: 1030,
        AIRLINE: "GoAir",
        DepartTime: "17:00:00",
        ArrivalTime: "19:45:00",
        Origin: "Trivandrum",
        Destination: "Coimbatore",
        FirstClass: 8700,
        BusinessClass: 6700,
        PremiumEconomyClass: 4700,
        EconomyClass: 2700
    },
    { 
        FID: 1031,
        AIRLINE: "Vistara",
        DepartTime: "20:30:00",
        ArrivalTime: "23:15:00",
        Origin: "Jaipur",
        Destination: "Ahmedabad",
        FirstClass: 9100,
        BusinessClass: 7100,
        PremiumEconomyClass: 5100,
        EconomyClass: 3100
    },
    { 
        FID: 1032,
        AIRLINE: "IndiGo",
        DepartTime: "00:00:00",
        ArrivalTime: "02:45:00",
        Origin: "Chennai",
        Destination: "Vadodara",
        FirstClass: 8000,
        BusinessClass: 6000,
        PremiumEconomyClass: 4000,
        EconomyClass: 2000
    },
    { 
        FID: 1033,
        AIRLINE: "Air Asia India",
        DepartTime: "03:30:00",
        ArrivalTime: "06:15:00",
        Origin: "Lucknow",
        Destination: "Nagpur",
        FirstClass: 9300,
        BusinessClass: 7300,
        PremiumEconomyClass: 5300,
        EconomyClass: 3300
    },
    { 
        FID: 1034,
        AIRLINE: "GoAir",
        DepartTime: "07:00:00",
        ArrivalTime: "09:45:00",
        Origin: "Bhubaneswar",
        Destination: "Jaipur",
        FirstClass: 8700,
        BusinessClass: 6700,
        PremiumEconomyClass: 4700,
        EconomyClass: 2700
    },
    { 
        FID: 1035,
        AIRLINE: "Vistara",
        DepartTime: "10:30:00",
        ArrivalTime: "13:15:00",
        Origin: "Patna",
        Destination: "Kolkata",
        FirstClass: 9100,
        BusinessClass: 7100,
        PremiumEconomyClass: 5100,
        EconomyClass: 3100
    },
    { 
        FID: 1036,
        AIRLINE: "Air India Express",
        DepartTime: "14:00:00",
        ArrivalTime: "16:45:00",
        Origin: "Ahmedabad",
        Destination: "Mumbai",
        FirstClass: 9400,
        BusinessClass: 7400,
        PremiumEconomyClass: 5400,
        EconomyClass: 3400
    },
    { 
        FID: 1037,
        AIRLINE: "SpiceJet",
        DepartTime: "17:30:00",
        ArrivalTime: "20:15:00",
        Origin: "Hyderabad",
        Destination: "Chandigarh",
        FirstClass: 8600,
        BusinessClass: 6600,
        PremiumEconomyClass: 4600,
        EconomyClass: 2600
    },
    { 
        FID: 1038,
        AIRLINE: "Air Bharat",
        DepartTime: "21:00:00",
        ArrivalTime: "23:45:00",
        Origin: "Bhopal",
        Destination: "Lucknow",
        FirstClass: 8900,
        BusinessClass: 6900,
        PremiumEconomyClass: 4900,
        EconomyClass: 2900
    },
    { 
        FID: 1039,
        AIRLINE: "Air Asia",
        DepartTime: "00:30:00",
        ArrivalTime: "03:15:00",
        Origin: "Pune",
        Destination: "Indore",
        FirstClass: 8300,
        BusinessClass: 6300,
        PremiumEconomyClass: 4300,
        EconomyClass: 2300
    },
    { 
        FID: 1040,
        AIRLINE: "SpiceJet",
        DepartTime: "23:00:00",
        ArrivalTime: "01:45:00",
        Origin: "Jaipur",
        Destination: "Lucknow",
        FirstClass: 8300,
        BusinessClass: 6300,
        PremiumEconomyClass: 4300,
        EconomyClass: 2300
    },
    { 
        FID: 1042,
        AIRLINE: "IndiGo",
        DepartTime: "04:00:00",
        ArrivalTime: "06:45:00",
        Origin: "Bangalore",
        Destination: "Trivandrum",
        FirstClass: 9000,
        BusinessClass: 7000,
        PremiumEconomyClass: 5000,
        EconomyClass: 3000
    },
    { 
        FID: 1101,
        AIRLINE: "IndiGo",
        DepartTime: "08:00:00",
        ArrivalTime: "10:30:00",
        Origin: "Delhi",
        Destination: "Mumbai",
        FirstClass: 9000,
        BusinessClass: 7000,
        PremiumEconomyClass: 5000,
        EconomyClass: 3000
    },
    { 
        FID: 1102,
        AIRLINE: "SpiceJet",
        DepartTime: "10:30:00",
        ArrivalTime: "13:00:00",
        Origin: "Bangalore",
        Destination: "Hyderabad",
        FirstClass: 8500,
        BusinessClass: 6500,
        PremiumEconomyClass: 4500,
        EconomyClass: 2500
    }
];
