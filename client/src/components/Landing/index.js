import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './style.css';

class Landing extends Component {
  render() {
    return (
      <>
        <h1>Choose SHN Hospital</h1>
        <div className="notranslate button-container">
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('/birchmount/')}
          >
            Birchmount
          </button>

          <button 
            className="circle-button"
            onClick={() => this.props.navigate('/centenary/')}
          >
            Centenary
          </button>
        </div>
      </>
    )
  }
}

export default withRouter(Landing);