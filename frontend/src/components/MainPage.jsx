import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  });

  return (
    <div>Hello world Main Page!</div>
  );
};

export default MainPage;
