import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TestComponent from './pages/TestComponent';
import TestTables from './pages/TestTables';
import TestSignInSide from './pages/TestSignInSide';
import LandingPage from './pages/LandingPage/LandingPage';
import ProtectedRoute from './Components/LoginAuth/ProtectedRoute';
import { AuthProvider } from './Components/LoginAuth/AuthContext';
import UserStatus from './Components/UserStatus';
import PublicRoute from './Components/LoginAuth/PublicRoute';
import UserProfile from './pages/UserProfile';
import Viagens from './pages/Viagens';

function App() {

  // Código de Terceiros:
  // Sign-In-Side / Sign-Up / Landing Page:
  // https://github.com/mui/material-ui/tree/v5.15.21/docs/data/material/getting-started/templates

  return (
    <AuthProvider>
      <div id="page-top">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={
            <ProtectedRoute>
              <TestTables />
            </ProtectedRoute>
          } />
          <Route path="/viagens" element={
            <PublicRoute>
              <Viagens />
            </PublicRoute>
          } />
          <Route path="/SignUp" element={
            <PublicRoute>
              <TestComponent />
            </PublicRoute>
          } />
          <Route path="/SignIn" element={
            <PublicRoute>
              <TestSignInSide />
            </PublicRoute>
          } />
          <Route path="/user-status" element={<UserStatus />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
