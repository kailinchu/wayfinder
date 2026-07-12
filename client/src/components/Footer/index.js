import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">&copy;&nbsp; 2026 SHN WayFinder. Developed by Volunteer Services WayFinding Team.</span>
        </div>
      </footer>
    )
  }
}

export default Footer;
