/*<<<<<<< CampiBranch
import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { getCenas } from './Services/ceninhas'; */

// main branch
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import MainNavbar from './Components/GeneralComponents/MainNavbar';
import SiginPage from './pages/Sigin/signin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';


function App() {

  useEffect(() => { 
    getCenas().then((response) => {
      console.log(response);
    });
  }, []);



  return (
    <div>
    <div id="page-top">
      <MainNavbar></MainNavbar>
        <Routes>
            <Route path="/" element={ <HomePage></HomePage>} />
            <Route path="/Login" element={ <SiginPage></SiginPage>} />
            <Route path="/Registo" element={ <SiginPage></SiginPage>} />
        </Routes>
        <footer class="footer bg-black small text-center text-white-50"><div class="container px-4 px-lg-5">Copyright &copy; Your Website 2023</div></footer>
    </div>
    </div>
  );
}

export default App;