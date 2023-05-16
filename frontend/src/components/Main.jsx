import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.js';
import Chat from './Chat.jsx';

const Main = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  });

  return (
    <Chat />
  );
};

export default Main;
