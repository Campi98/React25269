import React from 'react';
import './pages/startbootstrap-grayscale-gh-pages/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import MainNavbar from './Components/GeneralComponents/MainNavbar';
import SiginPage from './pages/Sigin/signin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
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
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    </div>
    </div>
  );
}

export default App;