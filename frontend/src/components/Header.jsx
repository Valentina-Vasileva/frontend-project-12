import React, { useContext } from 'react';
import {
  Button,
  Container, Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="white" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          { auth && <Button variant="primary" onClick={() => logout()}>{t('login.buttons.logout')}</Button> }
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
