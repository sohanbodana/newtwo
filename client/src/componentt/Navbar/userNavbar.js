import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';   /// bootstrap css
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  /// bootstrap js
import fl from './airplane.png'

import '../navbar.css';

const UserNavbar = () => {
  const location = useLocation();

  return (
    <div className="navbar11">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`${process.env.PUBLIC_URL}/userSuccess`} style={{marginLeft:'10px'}}>
            <img src={fl} className='fl' alt='Flight' />
            <span className='navb'>AIR-EASY</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              <li className='nav-item'>
                <Link className={`nav-link  ${location.pathname === '/userSuccess' ? 'active' : ''}`} to="/userSuccess" style={{ fontWeight: 'bold' }}>Home</Link>
              </li>

              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/usercontact' ? 'active' : ''}`} to="/usercontact" style={{ fontWeight: 'bold' }}>Contact</Link>
              </li>

              <li className='nav-item'>
                <Link className={`nav-link  ${location.pathname === '/flightdetail' ? 'active' : ''}`} to="/flightdetail" style={{ fontWeight: 'bold' }}>Flight Detail</Link>
              </li>

              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/cancel' ? 'active' : ''}`} to="/cancel" style={{ fontWeight: 'bold' }}>Cancel Booking</Link>
              </li>

              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/Search&Edit' ? 'active' : ''}`} to="/Search&Edit" style={{ fontWeight: 'bold' }}>Search Passenger</Link>
              </li>

              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/Search&Edit' ? 'active' : ''}`} to="/Search&Edit" style={{ fontWeight: 'bold' }}>Edit Passenger</Link>
              </li>

              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`} to="/" style={{ fontWeight: 'bold' }}>Logout <i className="fas fa-user"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
