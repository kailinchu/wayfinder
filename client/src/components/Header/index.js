import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './style.css';

class Header extends Component {
  render() {
    return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/images/logo.png" alt="SHN WayFinder" className="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/faqs">FAQs</NavLink>
              <NavLink to="/directory">Directory</NavLink>
              <NavLink to="/map">Map</NavLink>
              <NavLink to="/feedback">Feedback</NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    )
  }
}

export default Header;