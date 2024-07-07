import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuthStatus, loginUser, logoutUser } from '../../Services/api'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    console.log('Stored Auth:', storedAuth);
    if (storedAuth === 'true') {
      checkAuthStatus()
        .then(response => {
          console.log('Auth Status Response:', response);
          setIsAuthenticated(response.data.isAuthenticated);
          if (response.data.isAuthenticated) {
            localStorage.setItem('isAuthenticated', 'true');
          } else {
            localStorage.removeItem('isAuthenticated');
          }
        })
        .catch(error => {
          console.error('Auth Status Check Failed:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');
        });
    }
  }, []);

  const login = async (credentials) => {
    await loginUser(credentials);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
