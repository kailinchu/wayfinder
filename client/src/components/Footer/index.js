import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">
            &copy;&nbsp; 2026 SHN WayFinder. Developed by{' '}
            <Link className="footer-link" to="/credits">
              Volunteer Services WayFinding Team and contributors
            </Link>.
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer;
