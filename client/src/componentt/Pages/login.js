import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import AppNavbar from '../Navbar/navbar';
import '../login.css';

const LogIn = () => {

  ////////// home flight data pass

  const location = useLocation();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isChecked, setIsChecked] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState([]); // Updated state for selectedFlight

  console.log(selectedFlight);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert('Please agree to the Policy and Terms of Use.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3001/login', {
        email: credentials.email,
        password: credentials.password,
      });
      // console.log(response);
      

      if (response.data.success) {
        alert('Login successful!');

        if (location.state && location.state.selectedFlight) {
          navigate('/booking', {
            state: {
              userdata: credentials,
              selectedFlight: location.state.selectedFlight,
              selectedDate: location.state.selectedDate,
            },
          });
        }

        navigate('/userSuccess', {
          state: {
            userdata: credentials,
          },
        });

      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };

  const handlesign = () => {
    if (location.state && location.state.selectedFlight) {
      navigate('/signup', {
        state: {
          selectedFlight: location.state.selectedFlight,
          selectedDate: location.state.selectedDate,
        },
      });
    } else {
      navigate('/signup');
    }
  };

  return (
    <div>
      <AppNavbar />
      <div className="container" style={{ marginTop: "50px" }}>
        <div className='card text-black m-5' style={{ borderRadius: '25px' }}>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center '>

                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">LogIn</p>

                <form onSubmit={handleLogin}>
                  <div className="form-group mb-4">
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      placeholder='Your Email'
                      value={credentials.email}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label>Password:</label>
                    <input
                      type="text"
                      name="password"
                      placeholder='Your Password'
                      value={credentials.password}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>

                  <div className='form-check mb-4'>
                    <input
                      type='checkbox'
                      id='flexCheckDefault'
                      className='form-check-input'
                      onChange={handleCheckboxChange} // Use handleCheckboxChange for checkbox
                    />
                    <label className='form-check-label ms-2' htmlFor='flexCheckDefault'>
                      Agree with the Policy and Terms of Use
                    </label>
                  </div>

                  <button className='btn btn-primary mx-2'>LogIn</button>
                  
                  <button className='btn btn-primary mx-2' onClick={handlesign}>Create New Account</button>

                </form>

              </div>

              <div className='col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center'>
                <img
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                  alt='Registration'
                  className='img-fluid'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LogIn;
