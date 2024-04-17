import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserNavbar from "../Navbar/userNavbar";
import Swal from "sweetalert2";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../userSuccess.css';
import '../home.css';

const FlightDetail = () => {

        const location = useLocation();
        let userdata = location.state?.userdata || {};
        console.log(userdata);
        

        const [flights, setFlights] = useState([]);
        const [userfind, setuser] = useState({});
        const [PNRs, setPNRs] = useState([]);

        useEffect(() => {
                userdrct();
            }, []);
        
            const userdrct = async () => {
                try {
                    const response = await Axios.post("http://localhost:3001/finduser", {
                        email: location.state?.userdata?.email,
                    });
                    if (response.data.length > 0) {
                        setuser(response.data[0]);
                        const userdata = response.data[0];
                        const PNRs = userdata.PNR || [];
                        setPNRs(PNRs);
                        handleSearch(PNRs);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            console.log(PNRs);
            
        
            const handleSearch = async (PNRs) => {
                try {
                    const response = await Axios.post("http://localhost:3001/searchTicket", {
                        origin: PNRs,
                    });
                    setFlights(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            
            const handleDelete = async (PNR) => {
                try {
                        // Make the Axios request to delete the flight
                        const response = await Axios.delete(`http://localhost:3001/cancelbooking/${PNR}`);

                        if (response.data.err) {
                                throw new Error(response.data.err);
                        }

                        // Update the flights state after successful deletion
                        setFlights((prevFlights) => prevFlights.filter((flight) => flight.origin !== origin));

                        // Display success message using SweetAlert or other notification library
                        Swal.fire({
                                icon: 'success',
                                title: 'Flight Deleted Successfully',
                        });
                        window.location.reload();

                } catch (error) {
                        // Display error message using SweetAlert or other notification library
                        Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: error.message,
                        });
                }
        };


        return (
                <div>
                        <UserNavbar />
                        <section className="profile">
                                <header className="header">
                                        <div className="details">
                                                <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=b38c22a46932485790a3f52c61fcbe5a" alt="John Doe" className="profile-pic" />
                                                <h1 className="heading">{userdata.name||userfind.name}</h1>
                                                <div className="location">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                                                        </svg>
                                                        <p>India</p>
                                                </div>
                                                <div className="stats">
                                                        <div className="col-4">
                                                                <h4>Name</h4>
                                                                <p>{userdata.name||userfind.name}</p>
                                                        </div>
                                                        <div className="col-4">
                                                                <h4>Email</h4>
                                                                <p>{userdata.email||userfind.email}</p>
                                                        </div>
                                                        <div className="col-4">
                                                                <h4>Contact</h4>
                                                                <p>{userdata.contact}---</p>
                                                        </div>
                                                </div>
                                        </div>
                                </header>
                        </section>


                        <div className="tbshow">

                                <div className="table-responsive">
                                        <table className="styled-table bg-white  " style={{ color: 'black' }} >
                                                <thead>
                                                        <tr>
                                                                <th style={{ textAlign: "center" }}>PNR</th>
                                                                <th style={{ textAlign: "center" }}>NAME</th>
                                                                <th style={{ textAlign: "center" }}>AGE</th>
                                                                <th style={{ textAlign: "center" }}>EMAIL</th>
                                                                <th style={{ textAlign: "center" }}>CONTACT</th>
                                                                <th style={{ textAlign: "center" }}>FID</th>
                                                                <th style={{ textAlign: "center" }}>AIRLINE</th>
                                                                <th style={{ textAlign: "center" }}>DepartTime</th>
                                                                <th style={{ textAlign: "center" }}>ArrivalTime</th>
                                                                <th style={{ textAlign: "center" }}>Departure</th>
                                                                <th style={{ textAlign: "center" }}>Arrival</th>
                                                                <th style={{ textAlign: "center" }}>FClass</th>
                                                                <th style={{ textAlign: "center" }}>Action</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        {flights.map((flight, index) => (
                                                                <tr key={index} >
                                                                        <td>{flight.PNR}</td>
                                                                        <td>{flight.name}</td>
                                                                        <td>{flight.age}</td>
                                                                        <td>{flight.email}</td>
                                                                        <td>{flight.contact}</td>
                                                                        <td>{flight.FID}</td>
                                                                        <td>{flight.AIRLINE}</td>
                                                                        <td>{flight.DepartTime}</td>
                                                                        <td>{flight.ArrivalTime}</td>
                                                                        <td>{flight.Origin}</td>
                                                                        <td>{flight.Destination}</td>
                                                                        <td>{flight.fclass}</td>
                                                                        <td >
                                                                                <button onClick={() => handleDelete(flight.PNR)}
                                                                                        className="btn btn-primary"
                                                                                >Delete</button>
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

export default FlightDetail;

