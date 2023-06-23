import React from 'react';
import {
  Button,
  Container, Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices/authSlice.js';

const Header = () => {
  const auth = useSelector((selector) => selector.authReducer.auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClickLogoutHandle = () => {
    dispatch(dispatch(actions.logout()));
  };

  return (
    <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        { auth && <Button variant="primary" onClick={onClickLogoutHandle} aria-label={t('login.buttons.logout')}>{t('login.buttons.logout')}</Button> }
      </Container>
    </Navbar>
  );
};

export default Header;
