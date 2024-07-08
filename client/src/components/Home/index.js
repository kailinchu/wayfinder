import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './style.css';

class Home extends Component {
  render() {
    return (
      <>
        <div className="button-container">
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('./faqs')}
          >
            FAQs
          </button>
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('./directory')}
          >
            Directory
          </button>
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('./map')}
          >
            Map
          </button>
        </div>
      </>
    )
  }
}

export default withRouter(Home);