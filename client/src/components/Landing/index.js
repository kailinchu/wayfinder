import React, { Component } from 'react';
import './style.css';

class Landing extends Component {
  render() {
    return (
      <>
        <h1>Choose SHN Hospital</h1>
        <div className="button-container">
          <button className="circle-button">Birchmount</button>
          <button className="circle-button">Centenary</button>
        </div>
      </>
    )
  }
}

export default Landing;