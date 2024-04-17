import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Swal from 'sweetalert2';
import AdminNavbar from "../Navbar/adminNavbar";
import './styles/AddEdit.css';

const initialState = {
    id: "",
    name: "",
    email: "",
    password: "",
    Cpassword: ""
};

const AddUser = () => {
    const [state, setState] = useState(initialState);
    const [flights, setFlights] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ origin: '' });
    const navigate = useNavigate();

    const [alrt, setalrt] = useState(false);

    // const [showPassword, setShowPassword] = useState(false);  /// show Password
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await Axios.get(`http://localhost:3001/searchuser`);
            setFlights(response.data);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })


    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:3001/searchUserShow", { origin: searchCriteria.origin });
            setFlights(response.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!state.name || !state.email || !state.password || !state.Cpassword) {
                throw new Error("Required Fields are empty");
            }

            if (state.password !== state.Cpassword) {
                setalrt(true); // Set password error state to true if passwords don't match
                return;
            }

            const response = await Axios.post("http://localhost:3001/adduserdata", state);
            if (response.data.err) {
                throw new Error(response.data.err);
            }

            setState(initialState);
            Swal.fire({ icon: 'success', title: 'Flight Added Successfully' });
            setTimeout(() => navigate("/adduser"), 500);
            window.location.reload();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const handleDelete = async (fid) => {
        try {
            const response = await Axios.delete(`http://localhost:3001/deleteuser/${fid}`);
            if (response.data.err) {
                throw new Error(response.data.err);
            }
            setFlights(prevFlights => prevFlights.filter(flight => flight.id !== fid));
            Swal.fire({ icon: 'success', title: 'Flight Deleted Successfully' });
            window.location.reload();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });

    };

    //math both password
    useEffect(() => {

    }, [])

    return (
        <div className="text-black">
            <AdminNavbar />
            <div style={{ marginTop: "10px" }}>
                <form onSubmit={handleSearch}>
                    <div id="mydata">
                        <center>
                            <h4 className="text-white">Easy Search -Flightdata</h4>
                            <table cellPadding="8">
                                <tbody style={{ margin: '20px', color: 'white' }}>
                                    <tr>
                                        <td>Search</td>
                                        <td>
                                            <label className="tbtd">You can search using Name & Email </label>
                                            <input
                                                type="text"
                                                placeholder="Name/Email"
                                                className="Aa"
                                                name="origin"
                                                value={searchCriteria.origin}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <td colSpan="2" >
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
            <div style={{ marginTop: "15px" }}>
                <form onSubmit={handleSubmit} style={{ margin: "auto", padding: "15px", maxWidth: "600px", alignContent: "center", backgroundColor: "grey", borderRadius: "10px" }}>

                    <label >ID</label>
                    <input type="text" name="id" value={state.id} placeholder="Enter ID *Automaticaiiy assign*" onChange={handleInputChange} disabled />

                    <label >Name</label>
                    <input type="text" name="name" value={state.name} placeholder="Enter Name" onChange={handleInputChange} />

                    <label>Email</label>
                    <input type="email" name="email" value={state.email} placeholder="Enter Email" onChange={handleInputChange} />

                    <label >Password</label><br />
                    {/* <input type={showPassword ? 'text' : 'password'} */}
                    <input type='password'
                     name="password" value={state.password} 
                     placeholder="Enter Password" 
                     onChange={handleInputChange} /><br/>
                    {/* <button className="show" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button> */}
                    <br />

                    <label >Re-enter Password</label><br />
                    <input type="password" name="Cpassword" value={state.Cpassword} placeholder="Re-enter Password" onChange={handleInputChange} />

                    {/*pass checking*/}   {alrt && <p style={{ color: 'red' }}>Passwords do not match.</p>}

                    <input type="submit" value="Add" />
                    <Link to="/adminhome"><input type="button" value="Back" /></Link>
                </form>
            </div>
            <div className="tbshow m-3">
                <div className="table-responsive">
                    <h2 className="justify text-center text-white">User's Data</h2>
                    <table className="styled-table" style={{ background: 'white', color: 'black' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>ID</th>
                                <th style={{ textAlign: "center" }}>Name</th>
                                <th style={{ textAlign: "center" }}>Email</th>
                                <th style={{ textAlign: "center" }}>Password</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {flights.map((flight, index) => (
                                <tr key={index} >
                                    <td>{flight._id}</td>
                                    <td>{flight.name}</td>
                                    <td>{flight.email}</td>
                                    <td>{flight.password.assword}</td>
                                    <td >
                                        <button onClick={() => handleDelete(flight._id)} className="btn btn-primary">Delete</button>
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

export default AddUser;
