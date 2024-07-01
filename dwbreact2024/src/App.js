import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TestComponent from './pages/TestComponent';
import TestTables from './pages/TestTables';
import TestSignInSide from './pages/TestSignInSide';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {

  return (
    <div>
      <div id="page-top">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<TestTables />} />
          <Route path="/SignUp" element={<TestComponent />} />
          <Route path="/SignIn" element={<TestSignInSide />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
