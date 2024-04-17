import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from "../Navbar/userNavbar";
import Axios from "axios";
import '../userSuccess.css';


const UserSuccess = () => {
  const navigates = useNavigate();
  const location = useLocation();

  const [selectedFlight, setSelectedFlight] = useState([]); // Updated state for selectedFlight
  //// serach flight search functionality and display available flights
  const [searchCriteria, setSearchCriteria] = useState({
    origin: '',
    destination: '',
  });
  const [flights, setFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/searchFlights", {
        origin: searchCriteria.origin,
        destination: searchCriteria.destination,
      });

      setFlights(response.data);

      setSelectedFlight(response.data[0]);  // for login send
      console.log(selectedFlight);
      

    } catch (error) {
      console.error(error);
    }
  };

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const [userfind, setuser] = useState({});
  console.log(userfind);

  const senddata = () => {
    if (!userdata) {
      // If userdata is null, set some default data
      navigates('/flightdetail', { state: { userdata: userdata,userfind:userfind } });
    } else {
      navigates('/flightdetail', { state: { userdata: userdata,userfind:userfind } });
    }
  };


  useEffect(() => {
    userdrct();
  }, []);

  let userdata = location.state?.userdata || userfind;

  const userdrct = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/finduser", {
        email: userdata.email,
      });
      if (response.data.length > 0) {
        setuser(response.data[0]);
        userdata = response.data[0];
        console.log(userdata);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const hClick = () => {
  //   navigate('/roundtrip');
  // };

  const cities = [
    'Select City', 'Ujjain', 'Indore', 'Hyderabad ', 'Mumbai', 'Chennai', 'Jaipur',
    'Kolkata', 'Chandigarh', 'Pune  ', 'Bhopal', 'Vadodara', 'Guwahati', 'Coimbatore',
    'Ahmedabad', 'Delhi ', 'Goa   ', 'Bangalore', 'Trivandrum', 'Varanasi', 'Surat ',
    'Nagpur', 'Ranchi', 'Bhubaneswar', 'Patna', 'Lucknow', 'Kochi'
  ];

  const inlinecss = {
    padding: '3px',
    margin: '2px',
  }
  const inlinecss2 = {
    margin_top: '20px',
    color: 'black',
  }

  return (
    <div>
      <UserNavbar />
      <div style={{ marginTop: "50px" }}>
        <section id="hero" className="d-flex align-items-center justify-content-center">
          <div className="container" data-aos="fade-up">
            <section class="profile">
              <header class="header">
                {/* {userfind.map((user, index) => ( */}
                  <div class="details">
                    <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=b38c22a46932485790a3f52c61fcbe5a" alt="John Doe" class="profile-pic" />
                    <h1 class="heading">{userdata.name||userfind.name}</h1>
                    <div class="location">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                      </svg>
                      <p>India</p>
                    </div>
                    <div class="stats">
                      <div class="col-4">
                        <h4>Name</h4>
                        <p>{userdata.name||userfind.name}</p>
                      </div>
                      <div class="col-4">
                        <h4>Email</h4>
                        <p>{userdata.email}</p>
                      </div>
                      <div class="col-4">
                        <h4>Contact</h4>
                        <p>{userdata.contact}----</p>
                      </div>
                    </div>
                  </div>
                {/* ))} */}
              </header>
            </section>

            <div className="row justify-content-center ">
              <div className="">
                <h1 className="" >
                  Welcome to AirEasy Flight Reservation System<span>.</span></h1>
                <h2>Elevating Every Journey, One Seamless Experience at a Time!</h2>
              </div>
            </div>
            <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">

              <div className="">
                <div className="icon-box">
                  <i className="ri-bar-chart-box-line"></i>
                  <h3>Search & BOOK</h3><p>First you have to search the flight then you will be able to book it.</p>

                  <button className="btn btn-success ">
                    <a href="#targetSection" style={{ fontSize: "14px", color: "white" }}>Search</a>
                  </button>

                </div>
              </div>

              <div className="m-4">
                <div className="icon-box">
                  <i className="ri-store-line"></i>
                  <h3>MY FLIGHT DETAILS</h3>
                  <button onClick={senddata} className="btn btn-success" style={{ fontSize: "14px" }}>
                    View Flights
                  </button>

                </div>
              </div>



              <div className="">
                <div className="icon-box">
                  <i className="ri-bar-chart-box-line"></i>
                  <h3>CANCEL BOOKING</h3>
                  <Link to={"/flightdetail"}>
                    <button className="btn btn-success" style={{ fontSize: "14px" }}>
                      CANCEL
                    </button>
                  </Link>
                </div>
              </div>

              <div className="">
                <div className="icon-box">
                  <i className="ri-database-2-line"></i>
                  <h3> Passenger Flight Edit</h3>
                  <Link to={"#"}>
                    <button className="btn btn-success" style={{ fontSize: "14px" }}>
                      Edit_Flight
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* //////////////////////  serach flight section */}

      <div >
          <form onSubmit={handleSearch}>
            <div id="mydata" style={inlinecss} >
              <center>
                <div className="Aaa text-white">
                  <h4 id="targetSection">Search Flight</h4>
                </div>
                <table cellPadding="8" style={inlinecss2} className='tb1'>
                  <tbody>
                    <tr>
                      <td>
                        {/* <button type="button" className="A" onClick={hClick}>
                        Round-way Trip
                      </button> */}
                        <button type="button" className="A">
                          One-way Trip
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="tbtd">Origin</td>
                      <td>
                        <select
                          name="origin"
                          className="Aa"
                          value={searchCriteria.origin}
                          onChange={handleChange}
                          required
                        >
                          {cities.map((city, index) => (
                            <option key={index}>{city}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tbtd">Destination</td>
                      <td>
                        <select
                          name="destination"
                          className="Aa"
                          value={searchCriteria.destination}
                          onChange={handleChange}
                          required
                        >
                          {cities.map((city, index) => (
                            <option key={index}>{city}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tbtd">Departure</td>
                      <td>
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          className="Aa"
                          name="departureDate"
                          onChange={handleChange}
                          required   //compulsory date
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className='text-center'>
                        <button type="submit" className="btn btn-success">
                          SEARCH
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>
          </form>
        </div>
      {/* ////////////////  flighshow */}

      <div className="tbshow m-3">

        <div className="table-responsive">
          <table className="styled-table ">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Airplane ID</th>
                <th style={{ textAlign: "center" }}>DepartTime</th>
                <th style={{ textAlign: "center" }}>ArrivalTime</th>
                <th style={{ textAlign: "center" }}>AIRLINE</th>
                <th style={{ textAlign: "center" }}>Departure</th>
                <th style={{ textAlign: "center" }}>Arrival</th>
                <th style={{ textAlign: "center" }}>FirstClass</th>
                <th style={{ textAlign: "center" }}>BusinessClass</th>
                <th style={{ textAlign: "center" }}>PremiumEconomy</th>
                <th style={{ textAlign: "center" }}>EconomyClass</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, index) => (
                <tr key={index} >
                  <td>{flight.FID}</td>
                  <td>{flight.DepartTime}</td>  
                  <td>{flight.ArrivalTime}</td>
                  <td>{flight.AIRLINE}</td>
                  <td>{flight.Origin}</td>
                  <td>{flight.Destination}</td>
                  <td>{flight.FirstClass}</td>
                  <td>{flight.BusinessClass}</td>
                  <td>{flight.PremiumEconomyClass}</td>
                  <td>{flight.EconomyClass}</td>
                  <td>
                  <button
                      className="btn btn-success"
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        // navigates('/login', { state: { selectedFlight } });
                        navigates('/Booking', { state: { selectedFlight, selectedDate: searchCriteria.departureDate, userdata: userdata } });

                      }}  
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSuccess;