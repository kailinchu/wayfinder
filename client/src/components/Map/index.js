import React, { Component } from 'react';
import './style.css';

class Map extends Component {
  render() {

    const mapImagePath = this.props.data[0]?.imagePaths;

    return (
      <>
        <h1 class="title">Map</h1>
        <img src={mapImagePath} alt="Hospital Map" class="map"/>
        <p>Map</p>
      </>
    );
  }
}

export default Map;

