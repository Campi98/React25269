import React, { useEffect } from 'react';
import { getCenas } from './Services/ceninhas';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SiginPage from './pages/Sigin/signin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TestPage from './pages/TestPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  useEffect(() => { 
    getCenas().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      <div id="page-top">
       
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<SiginPage />} />
          <Route path="/Registo" element={<SiginPage />} />
          <Route path="/test" element={<TestPage />} />
       </Routes>
        <footer className="footer bg-black small text-center text-white-50">
          <div className="container px-4 px-lg-5">
            Copyright &copy; Your Website 2023
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
