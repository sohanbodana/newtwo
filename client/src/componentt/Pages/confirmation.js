import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/navbar';
import Swal from "sweetalert2";
import Axios from 'axios';

const BookingConfirmation = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  
  // Check if location.state and location.state.selectedFlight are not null
  const selectedFlight = location.state?.selectedFlight || {};
  const selectedDate = location.state?.selectedDate || {};
  const formData = location.state?.formData || {};
  const userdata = location.state?.userdata || {};
  

  // console.log(location.state.selectedDate);
  console.log(location.state.userdata);
  // console.log(location.state.formData);
  // console.log(location.state.selectedFlight);

  
  const PNR = Math.floor(Math.random() * 1000).toString();

  const savebutton = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/tickets", {
        ...formData,
        ...selectedFlight, // usersuccess data
        EMAIL:userdata.email,
        // NAME:userdata.name,                      ///// userdetail name email
        PNR: PNR,
        flightDuration:flightDuration,
        selectedDate:selectedDate,

      });
      console.log(response.data);
      // console.log(userdata.PNR);

      Swal.fire("Successfull Booking!", "", "Success");
      navigate('/userSuccess',{state:{userdata }});

    } catch (error) {
      console.error(error);
      Swal.fire("Error in Booking!", "", "error");
    }
  };


  ////////// CALCULATE THE FLIGHT ARIVE TOTAL TIME THAT WHICH TIME TAKEN BY FLIGHT RICH THE DESTINATION
   // Calculate flight duration
   const departureDateTime = new Date(`2000-01-01 ${selectedFlight.DepartTime}`);
   const arrivalDateTime = new Date(`2000-01-01 ${selectedFlight.ArrivalTime}`);
   const timeDifference = arrivalDateTime - departureDateTime;
   const hours = Math.floor(timeDifference / (60 * 60 * 1000));
   const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
   const seconds = Math.floor((timeDifference % (60 )));

   // Format the duration as HH:mm:ss
   const flightDuration = `${hours}:${minutes}:${seconds}`;
   
  return (
    <div>
      <AppNavbar />

      <div className="container" style={{ marginTop: "50px", color: "white" }}>
        <h2 >Booking Confirmation</h2>
        <p>Hello, {formData.name || 'Guest'}! Your booking for the following flight has been confirmed:</p>
        <hr />
        <div >
          {/* {data.map((item, index) => {
                return ( */}
          <div>
            {/* <center> */}
            <h3 >Flight Details</h3> <hr />
            {/* </center> */}
            <p>Your PNR number is: <strong className='cm'>{PNR}</strong></p>
            <p>Passenger Name     : <strong className='cm'> {formData.name}</strong></p>
            <p>Airplane           : <strong className='cm'> {selectedFlight.AIRLINE} </strong></p>
            <p>Airplane ID        : <strong className='cm'> {selectedFlight.FID} </strong></p>
            <p>City               : <strong className='cm'>{selectedFlight.Origin} To {selectedFlight.Destination}</strong></p>
            <p>Departure Time     : <strong className='cm'> {selectedFlight.DepartTime}</strong></p>
            <p>Arrival Time       : <strong className='cm'> {selectedFlight.ArrivalTime}</strong></p>
            <p>Flight Duration    : <strong className='cm'>{flightDuration} HH:MM:SS</strong></p>
            <p>Date               : <strong className='cm'>{selectedDate} YY-MM-DD</strong></p>
            {/* <p>Date               : <strong className='cm'>{new Date(selectedDate).toLocaleDateString()} MM:DD:YY</strong></p> */}
          </div>
          <center>
            <h3 style={{ background: 'green', padding: "5px" }}>PAYMENT : {selectedFlight[formData.fclass]}</h3> <br />
            <button type="submit" className="btn btn-success" onClick={savebutton}>BOOK</button>
          </center>

          {/* );
          })} */}
        </div> <hr />
        <p>Thank you for choosing AirEasy. Have a pleasant journey!</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
