import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation: React.FC = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#astronauts'>Astronauts</Nav.Link>
          <Nav.Link href='#missions'>Missions</Nav.Link>
          <Nav.Link href='#settings'>Settings</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
