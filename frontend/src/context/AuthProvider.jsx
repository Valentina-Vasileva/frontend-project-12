import { useMemo, useState } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('token') !== null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth(true);
  };
  const logout = () => {
    setAuth(false);
    localStorage.removeItem('token');
  };

  const values = useMemo(() => ({ auth, login, logout }), [auth]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
