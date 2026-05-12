import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('isLogged');
  });

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin12345') {
      localStorage.setItem('isLogged', 'true');
      setUser('true');
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isLogged');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
