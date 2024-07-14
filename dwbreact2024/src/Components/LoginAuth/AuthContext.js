import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, checkAuthStatus, getUsers } from '../../Services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedAuth === 'true' && storedEmail) {
      checkAuthStatus()
        .then(response => {
          setIsAuthenticated(response.data.isAuthenticated);
          setUserEmail(storedEmail);
          if (response.data.isAuthenticated) {
            localStorage.setItem('isAuthenticated', 'true');
            checkAdminStatus(storedEmail);
          } else {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
          }
          setLoading(false);
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

  const checkAdminStatus = async (email) => {
    try {
      const response = await getUsers();
      const users = response.data;
      const user = users.find(u => u.email === email);
      if (user && user.tipo === 'Admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsAdmin(false);
    }
  };

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    setIsAuthenticated(true);
    setUserEmail(credentials.email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', credentials.email);
    checkAdminStatus(credentials.email);
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsAdmin(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
