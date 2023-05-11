import React from 'react';
import {
  Container, Navbar,
} from 'react-bootstrap';

const Header = () => (
  <Container>
    <Navbar expand="lg" variant="light" bg="white" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
  </Container>
);

export default Header;
