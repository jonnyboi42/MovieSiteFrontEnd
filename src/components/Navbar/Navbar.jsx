import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/icons/Logo.svg';

const HeaderBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary movie-nav">
      <Container>
        <Navbar.Brand href="#home" className='custom-logo'>
          {/* ATLAS <span>CINEMA</span><img src="src/assets/icons/moviesvg.svg" alt="" /> */}
          <img src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link href="#home" className="custom-nav-link">Home</Nav.Link>
            <Nav.Link href="#link" className="custom-nav-link">Rewards</Nav.Link>
            <Nav.Link href="#link" className="custom-nav-link">Food & Drinks</Nav.Link>

          </Nav>
          {/* New Nav for buttons aligned to the right */}
          <Nav className="ms-auto">
            <button>TICKETS</button>
            <button>JOIN / LOGIN</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderBar;
