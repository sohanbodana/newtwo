const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { randomBytes, createCipheriv, createDecipheriv } = require('crypto'); // Update import to include necessary cryptographic functions
const { promisify } = require('util');
const { Admin, Booking, Contactus, Flightshow, Search, Signup, Ticket, User } = require('./mongos'); // Import MongoDB models

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://deepakbodana100:12243648sS@cluster0.jiyyvda.mongodb.net/airfly',);



//////////////////// Encryption and Decryption
// Encryption and decryption configuration
const algorithm = 'aes-256-ctr';
const key = randomBytes(32);

function encrypt(text) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decrypt(iv, encryptedData) {
  const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

///////////////////////// End of Encr Decry 


// API endpoint to fetch flights based on origin and destination
app.post('/searchFlights', async (req, res) => {

  try {
    const { origin, destination } = req.body;
    const flights = await Flightshow.find({ Origin: origin, Destination: destination });
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, PNR } = req.body;
    const { iv, encryptedData } = encrypt(password);
    const user = new Signup({ name, email, password: { iv, encryptedData }, PNR });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Signup.findOne({ email: email }); // Find user by email only

    if (user) {
      const decryptedPassword = decrypt(user.password.iv, user.password.encryptedData);
      console.log(password);
      console.log(decryptedPassword);

      if (decryptedPassword === password) { // Compare decrypted password with provided password
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Login Admin
app.post('/adminlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ Username: username, Password: password });
    if (admin) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all flights                         /////// //////////////  Flight
app.get('/flightshow', async (req, res) => {
  try {
    const flights = await Flightshow.find();
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
///////////  search flight using input parameters
app.post('/SearchFlightShow', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    // If 'origin' is not a number, search by 'name' or 'email' field
    let tickets = await Flightshow.find({ Origin: origin, Destination: destination });
    if (!destination) {
      let tickets = await Flightshow.find({ Origin: origin });
    }
    res.json(tickets);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Add flight
app.post('/addflights', async (req, res) => {
  try {
    const flight = new Flightshow(req.body);
    await flight.save();
    res.status(200).send('Flight added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Delete flight
app.delete('/deleteflight/:fid', async (req, res) => {
  try {
    const userId = req.params.fid;
    const user = await Flightshow.deleteOne({ FID: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Flight Successfully Deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Add User data                      /////////////              USER 

app.post('/adduserdata', async (req, res) => {
  try {
    const user = new Signup(req.body);
    await user.save();
    res.status(200).send('User added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// User Search
app.get("/searchuser", async (req, res) => {
  try {
    const user = await Signup.find();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

});
// User Search using parameters
app.post("/", async (req, res) => {
  try {
    const { origin } = req.body;
    const user = await Signup.findOne({ name: origin });
    console.log(origin);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

});
app.post('/searchUserShow', async (req, res) => {
  try {
    const { origin } = req.body;
    // If 'origin' is not a number, search by 'name' or 'email' field
    let tickets = await Signup.find({ $or: [{ name: origin }, { email: origin }] });
    res.json(tickets);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// User Delete
app.delete("/deleteuser/:fid", async (req, res) => {
  try {
    const userId = req.params.fid;
    // Assuming Signup is your mongoose model for users
    const user = await Signup.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User Successfully Deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Contact Us
app.post('/support', async (req, res) => {
  try {
    const contact = new Contactus(req.body);
    await contact.save();
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/passengerdata", async (req, res) => {

  try {
    const result = await Booking.find();  // find() allfind|| findOne() only one specific finding
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

})

//////////  Paasenger data Delete 

app.delete("/PassengerDelete/:PNR", async (req, res) => {
  try {
    const fid = req.params.PNR;      //// params 

    const dlt = await Booking.deleteOne({ PNR: fid });
    if (dlt.deletedCount === 0) {
      res.status(404).json({ error: "Passenger not found" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//  route for BOOKING INSERTION IN THE Admin PAGE 

app.post('/bookings', async (req, res) => {
  try {
    const PNR = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    const { name, age, gender, address, state, email, contact, fclass } = req.body;

    // Create a new booking document
    const newBooking = new Booking({
      name,
      age,
      gender,
      address,
      state,
      email,
      contact,
      fclass,
      PNR
    });

    // Save the new booking document to the database
    await newBooking.save();

    res.status(201).json({ message: 'Passenger successfully added to bookings' });
  } catch (error) {
    console.error('Error inserting into MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// booking
app.post('/tickets', async (req, res) => {
  try {
    // Generate a single PNR for both tables


    const { EMAIL, PNR, name, age, email, contact, FID, AIRLINE, DepartTime, ArrivalTime, Origin, Destination, fclass, gender, address, state } = req.body;

    // Find the Signup document with the matching email and name
    console.log(EMAIL);

    //  console.log(NAME);

    const signup = await Signup.findOneAndUpdate(
      { email: EMAIL }, // search query
      { $push: { PNR: PNR } }, // update PNR
      { new: true } // return updated document
    );

    // Create a new ticket document
    const ticket = new Ticket({
      PNR,
      name,
      age,
      email,
      contact,
      FID,
      AIRLINE,
      DepartTime,
      ArrivalTime,
      Origin,
      Destination,
      fclass
    });

    // Save the ticket to the database
    await ticket.save();

    // Create a new bo]-oking document
    const booking = new Booking({
      PNR,
      name,
      age,
      gender,
      address,
      state,
      email,
      contact,
      fclass
    });

    if (!signup) {
      console.error('Error: No matching document found in the Signup collection');
      res.status(404).json({ error: 'No matching document found' });
    } else {
      console.log('Signup document successfully updated with PNR');
    }

    // Save the booking to the database
    await booking.save();

    //  Update the corresponding document in the signup collection  ///save same PNr number in signup


    res.status(201).json({ message: 'Passenger successfully added to bookings' });
  } catch (error) {
    console.error('Error inserting into MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/passengerdata", async (req, res) => {

  try {
    const result = await Booking.find();  // find() allfind|| findOne() only one specific finding
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

})

//////  tickets ==>> flight details + user details ===get_ticket 
app.get('/searchTicketShow', async (req, res) => {
  try {
    const result = await Ticket.find();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

/// tickets===>> find with specific input parameters  
app.post('/searchTicket', async (req, res) => {
  try {
    const { origin } = req.body;
    let tickets;

    if (Array.isArray(origin) && origin.length > 0) { // Check if 'origin' is an array with at least one element
      // Map each PNR to its corresponding tickets and concatenate the results
      const promises = origin.map(async (pnr) => {
        return await Ticket.find({ PNR: parseInt(pnr) });
      });
      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Concatenate the arrays of tickets into a single array
      tickets = results.reduce((acc, curr) => acc.concat(curr), []);
    } else {
      tickets = await Ticket.find({ $or: [{ name: origin }, { email: origin }, { contact: origin }] });

    }

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/////////  find user using email if user direct way a login page

app.post('/finduser', async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const result = await Signup.find({ email: email });
    res.json(result);
    console.log(result);


  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

})

// For your client-side code, you should use Axios.post instead of Axios.get because you’re sending a body in the request. Also, the origin should be in the body of the request, not in the URL:

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
