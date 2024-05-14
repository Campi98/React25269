import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/startbootstrap-grayscale-gh-pages/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { US } from 'country-flag-icons/react/3x2'

function MainNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">NomeApp + Logo</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#about">Discover</a></li>
                        <li className="nav-item"><a className="nav-link" href="#projects">Trips</a></li>
                        <li className="nav-item"><a className="nav-link" href="#signup">Review</a></li>
                        <li className="nav-item"><a className="nav-link" href="#metercena">Bandeira/Nacionalidade <US></US></a></li>
                        <li className="nav-item"><a className="nav-link" href="#metercena"><Link to="/Login">signin</Link></a></li>

                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default MainNavbar
