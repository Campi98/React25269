import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, checkAuthStatus } from '../../Services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedAuth === 'true' && storedEmail) {
      checkAuthStatus()
        .then(response => {
          console.debug('Auth status response:', response.data); // Debug
          setIsAuthenticated(response.data.isAuthenticated);
          setUserEmail(storedEmail);
          setLoading(false);
          if (response.data.isAuthenticated) {
            localStorage.setItem('isAuthenticated', 'true');
          } else {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
          }
        })
        .catch(error => {
          console.error('Error fetching auth status:', error); // Debug
          setIsAuthenticated(false);
          setUserEmail(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userEmail');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    console.debug('Login response:', response.data); // Debug
    setIsAuthenticated(true);
    setUserEmail(credentials.email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', credentials.email);
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
