import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';

const Header = () => {
  const [username, setUsername] = useState(null);

  const backend_domain = process.env.REACT_APP_BACKEND_DOMAIN;
  console.log(backend_domain);
  console.log('backend_domain');

  useEffect(() => {
    axios.get(`http://${backend_domain}/auth/user_detail/`, { withCredentials: true })
      .then(response => {
        if (response.data.username) {
          setUsername(response.data.username);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [backend_domain]);

  const handleLogout = () => {
    axios.post(`http://${backend_domain}/auth/logout/`, {}, { withCredentials: true })
      .then(response => {
        setUsername(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Navbar.Brand href="/" className="mr-auto">WHIZZY&LENS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav className="left-nav">
          <Nav.Link href="/about/">about</Nav.Link>
          <Nav.Link href="/photo_sessions/">my sessions</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={username ? username : "profile"} id="basic-nav-dropdown">
            {username ? (
              <>
                <NavDropdown.Item href="/profile">my profile</NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={handleLogout}>log Out</NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item href="/login">login</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
