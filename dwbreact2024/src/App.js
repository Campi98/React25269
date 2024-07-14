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
import AdminRoute from './Components/LoginAuth/AdminRoute';
import { AuthProvider } from './Components/LoginAuth/AuthContext';
import PublicRoute from './Components/LoginAuth/PublicRoute';
import UserProfile from './pages/UserProfile';
import Viagens from './pages/Viagens';

function App() {

  // Código de Terceiros:
  // Sign-In-Side / Sign-Up / Landing Page:
  // https://github.com/mui/material-ui/tree/v5.15.21/docs/data/material/getting-started/templates
  // + Uso de GitHub Copilot para sugestões de código; e tirar dúvidas ao encontrar erros.

  return (
    <AuthProvider>
      <div id="page-top">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/BackOffice" element={
            <AdminRoute>
              <TestTables />
            </AdminRoute>
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
