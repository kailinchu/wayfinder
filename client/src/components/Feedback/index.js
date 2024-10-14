import React, { Component } from 'react';
import './style.css';

class Feedback extends Component {
  render() {
    return (
      <>
      <div class="title-container">
        <h1 class="title">Feedback</h1>
        </div>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdJoV8gHmp4djwpJIJAha48j_vMEWtbeuUVjALZ23-salJZUA/viewform?embedded=true" width="100%" height="750" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> 
        <p>Feedback</p>
      </>
    )
  }
}

export default Feedback;