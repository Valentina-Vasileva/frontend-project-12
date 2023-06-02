import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Chat from './Chat/Chat.jsx';
import routes from '../routes.js';

const Main = () => {
  const navigate = useNavigate();
  const auth = useSelector((selector) => selector.authReducer.auth);

  useEffect(() => {
    if (!auth) {
      navigate(routes.frontend.login());
    }
  }, [auth, navigate]);

  return (
    <Chat />
  );
};

export default Main;
