import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../navbar.css'
import fl from './airplane.png'

const AdminNavbar = () => {
  const location = useLocation();

  const textStyle = {
    color: 'white',
    fontSize: '15px',
    margin: '0px 5px',
    fontWeight: location.pathname === '/' ? 'bold' : 'normal' // Check if the link is active
  };

  return (
    <div className="navbar11">

      <Navbar bg="dark" variant="dark" expand="lg" className="navbar11">
        <Navbar.Brand as={Link} to={`${process.env.PUBLIC_URL}/adminhome`} style={{marginLeft:'10px'}}>
          <img src={fl} className='fl' alt='Flight' />
          <span className='navb'>AIR-EASY</span>
        </Navbar.Brand>
        <Nav.Link as={Link} to="/adminhome" style={textStyle}><strong>~Admin~</strong></Nav.Link>
        <Nav.Link as={Link} to="/" style={textStyle}><strong>Logout</strong></Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto table-hover ">
            <Nav.Link className={`hv ${location.pathname === '/adminhome' ? 'active' : ''}`} as={Link} to="/adminhome" style={textStyle}><strong>Home</strong></Nav.Link>
            <Nav.Link className={`hv ${location.pathname === '/passengerdata' ? 'active' : ''}`} as={Link} to="/passengerdata" style={textStyle}><strong>PassengerData</strong></Nav.Link>
            <Nav.Link className={`hv ${location.pathname === '/tickets' ? 'active' : ''}`} as={Link} to="/tickets" style={textStyle}><strong>TicketDetail</strong></Nav.Link>
            <Nav.Link className={`hv ${location.pathname === '/addflights' ? 'active' : ''}`} as={Link} to="/addflights" style={textStyle}><strong>Flights</strong></Nav.Link>
            <Nav.Link className={`hv ${location.pathname === '/adduser' ? 'active' : ''}`} as={Link} to="/adduser" style={textStyle}><strong>ViewUser</strong></Nav.Link>
            <Nav.Link className={`hv ${location.pathname === '/addflights' ? 'active' : ''}`} as={Link} to="/addflights" style={textStyle}><strong>DeleteFlights</strong></Nav.Link>
            <Nav.Link className={`hv ${location.pathname === '/adduser' ? 'active' : ''}`} as={Link} to="/adduser" style={textStyle}><strong>DeleteUser</strong></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
