import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/Logo.svg';

const HeaderBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary movie-nav">
      <Container>
        <Navbar.Brand as={Link} to="/" className='custom-logo'>
          <img src={Logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link as={Link} to="/" className="custom-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/rewards" className="custom-nav-link">Rewards</Nav.Link>
            <Nav.Link as={Link} to="/food-drinks" className="custom-nav-link">Food & Drinks</Nav.Link>
          </Nav>
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

