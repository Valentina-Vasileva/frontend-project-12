import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.js';

const MainPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  });

  return (
    <div>Hello world Main Page!</div>
  );
};

export default MainPage;
