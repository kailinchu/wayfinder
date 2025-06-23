import React, { Component } from 'react';
import './style.css';

class Map extends Component {
  render() {
    // Access the site prop and construct the image path dynamically
    const { site } = this.props; // Get the site prop
    const capitalizedSite = site.charAt(0).toUpperCase() + site.slice(1); // Capitalize first letter
    const mapImagePath = `../../../images/${capitalizedSite}-Maps/general.png`; // Use capitalized site

    return (
      <>
        <div className="title-container">
            <h1 className="title">Map</h1>
        </div>
        <img 
          src={mapImagePath} 
          alt={`${site} Map`} 
          className="map" 
        />
      </>
    );
  }
}

export default Map;

