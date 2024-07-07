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
          <Route path="/SignUp" element={<TestComponent />} />
          <Route path="/SignIn" element={<TestSignInSide />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
