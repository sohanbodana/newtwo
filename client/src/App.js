import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Home from "./componentt/Pages/home";
import About from "./componentt/Pages/about";
import SignUp from "./componentt/Pages/signup";
import Support from "./componentt/Pages/support";
import LogIn from "./componentt/Pages/login";
import Footer from "./componentt/Pages/footer";
import Roundtrip from "./componentt/Pages/roundtrip";
import Flightshow from "./componentt/Pages/flightshow";
import UserSuccess from "./componentt/Pages/userSuccess";
import UserNavbar from "./componentt/Navbar/userNavbar";
import Logout from "./componentt/Pages/logout";
import Booking from "./componentt/Pages/booking";
import Cancel from "./componentt/Pages/cancel";
import UserContact from "./componentt/Navbar/usercontact";
import FightDetail from "./componentt/Pages/flightdetail";
import AdminLogin from "./componentt/Admin/adminlogin";
import AdminHome from "./componentt/Admin/adminhome";
import AdminNavbar from "./componentt/Navbar/adminNavbar";
import AddFlight from "./componentt/Admin/addflights";
import AddUser from "./componentt/Admin/adduser";
import DeleteFlight from "./componentt/Admin/deleteflights";
import Deletepass from "./componentt/Admin/deletepass";
import DeleteUser from "./componentt/Admin/deleteuser";
import PassengerData from "./componentt/Admin/passengerdata";
import ViewFlights from "./componentt/Admin/viewFlights";
import SearchEdit from "./componentt/Pages/Search&Edit";
import Ticketdetail from "./componentt/Admin/tickets";
import BookingConfirmation from "./componentt/Pages/confirmation";

const App = () => {
  const [searchCriteria] = useState({
    origin: '',
    destination: '',
  });

  const steps = [
    {
      id: '0',
      message: 'Welcome to Airline Services! How can I assist you today?',
      trigger: '1'
    },
    {
      id: '1',
      options: [
        { value: 'book_flight', label: 'Book a Flight', trigger: 'book_flight' },
        { value: 'check_flight_status', label: 'Check Flight Status', trigger: 'check_flight_status' },
        { value: 'cancel_booking', label: 'Cancel Booking', trigger: 'cancel_booking' },
        { value: 'talk_to_agent', trigger: 'talk_to_agent' },
        { value: 'exit', label: 'Exit', trigger: 'exit' }
      ]
    },
    {
      id: 'book_flight',
      message: 'Great! Let\'s start booking a flight. Please provide me with your departure and destination cities, as well as the date of travel.',
      trigger: 'book_flight_details'
    },
    {
      id: 'book_flight_details',
      user: true,
      trigger: 'book_flight_confirmation'
    },
    {
      id: 'book_flight_confirmation',
      message: 'You want to book a flight from {previousValue.departure_city} to {previousValue.destination_city} on {previousValue.travel_date}. Is that correct?',
      trigger: 'book_flight_confirm_options'
    },
    {
      id: 'book_flight_confirm_options',
      options: [
        { value: 'yes', label: 'Yes', trigger: 'book_flight_confirmed' },
        { value: 'no', label: 'No, let me correct it', trigger: 'book_flight_details' }
      ]
    },
    {
      id: 'book_flight_confirmed',
      message: 'Your flight has been booked successfully. Have a pleasant journey!',
      end: true
    },
    {
      id: 'check_flight_status',
      message: 'Please provide your flight number to check its status.',
      trigger: 'check_flight_status_details'
    },
    {
      id: 'check_flight_status_details',
      user: true,
      trigger: 'check_flight_status_result'
    },
    {
      id: 'check_flight_status_result',
      message: 'The status of your flight {previousValue} is currently on time. Is there anything else I can assist you with?',
      trigger: '1'
    },
    {
      id: 'cancel_booking',
      message: 'To cancel your booking, please provide your booking reference number.',
      trigger: 'cancel_booking_details'
    },
    {
      id: 'cancel_booking_details',
      user: true,
      trigger: 'cancel_booking_confirmation'
    },
    {
      id: 'cancel_booking_confirmation',
      message: 'Are you sure you want to cancel the booking with reference number {previousValue}?',
      trigger: 'cancel_booking_confirm_options'
    },
    {
      id: 'cancel_booking_confirm_options',
      options: [
        { value: 'yes', label: 'Yes', trigger: 'booking_cancelled' },
        { value: 'no', label: 'No, I changed my mind', trigger: '1' }
      ]
    },
    {
      id: 'booking_cancelled',
      message: 'Your booking has been successfully cancelled.',
      end: true
    },
    {
      id: 'talk_to_agent',
      message: 'Sure! Please wait while I connect you to the next available agent.',
      end: true
    },
    {
      id: 'exit',
      message: 'Thank you for using Airline Services. Have a great day!',
      end: true
    }
  ];


  // Creating our own theme
  const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
  };

  // Set some properties of the bot
  const config = {
    botAvatar: './robot.jpg',
    floating: true,
  };

  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Support />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/roundtrip" element={<Roundtrip />} />
          <Route path="/flightshow" element={<Flightshow searchCriteria={searchCriteria} />} />
          <Route path="/userSuccess" element={<UserSuccess />} />
          <Route path="/userNavbar" element={<UserNavbar />} />
          <Route path="/Search&Edit" element={<SearchEdit />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/flightdetail" element={<FightDetail />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/usercontact" element={<UserContact />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminNavbar" element={<AdminNavbar />} />
          <Route path="/addflights" element={<AddFlight />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/deleteflights" element={<DeleteFlight />} />
          <Route path="/deletepass" element={<Deletepass />} />
          <Route path="/deleteuser" element={<DeleteUser />} />
          <Route path="/passengerdata" element={<PassengerData />} />
          <Route path="/viewFlights" element={<ViewFlights />} />
          <Route path="/tickets" element={<Ticketdetail />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Routes>
        <Footer />
        <ThemeProvider theme={theme} >
          <ChatBot
            headerTitle="Welcome User"
            steps={steps}
            {...config}
            />
        </ThemeProvider>
            </div>
  );
};

export default App;
