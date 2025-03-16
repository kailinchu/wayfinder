import React, { Component } from 'react';
import './style.css';

class Map extends Component {
  render() {

    const mapImagePath = this.props.data[0]?.imagePaths;

    return (
      <>
        <div className="title-container">
            <h1 className="title">Map</h1>
        </div>
        <img src={mapImagePath} alt="Hospital Map" className="map"/>
      </>
    );
  }
}

export default Map;

