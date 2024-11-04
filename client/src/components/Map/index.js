import React, { Component } from 'react';
import './style.css';

class Map extends Component {
  render() {

    const mapImagePath = this.props.data[0]?.imagePaths;

    return (
      <>
        <div class="title-container">
            <h1 class="title">Map</h1>
        </div>
        <img src={mapImagePath} alt="Hospital Map" class="map"/>
      </>
    );
  }
}

export default Map;

