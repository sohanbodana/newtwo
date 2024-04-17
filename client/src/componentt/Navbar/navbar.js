import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';     /// bootstrap css
import 'bootstrap/dist/js/bootstrap.bundle.min.js';   ///bootstrap  java script 
import '../navbar.css';
import fl from './airplane.png'


const AppNavbar = () => {
  const location = useLocation();

  return (
    <div className="navbar11">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`${process.env.PUBLIC_URL}/`}  style={{marginLeft:'10px'}}>
            <img src={fl} className='fl' alt='img'/>
            <span className='navb'>AIR-EASY</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" style={{ fontWeight: 'bolder' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about" style={{ fontWeight: 'bolder' }}>About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`} to="/contact-us" style={{ fontWeight: 'bolder' }}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup" style={{ fontWeight: 'bolder' }}>Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login" style={{ fontWeight: 'bolder' }}>Login <i className="fas fa-user"></i></Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/adminhome" style={{ fontWeight: 'bolder' }}>Admin Login <i className="fas fa-user"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  );
};

export default AppNavbar;
