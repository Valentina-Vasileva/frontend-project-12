import { useMemo, useState } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const isAuth = localStorage.getItem('token') !== null;
  const currentUsername = localStorage.getItem('username');

  const [auth, setAuth] = useState(isAuth && currentUsername !== null);
  const [username, setUsername] = useState(currentUsername);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);
    setAuth(true);
    setUsername(user);
  };
  const logout = () => {
    setAuth(false);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const values = useMemo(() => ({
    auth, username, login, logout,
  }), [auth, username]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
