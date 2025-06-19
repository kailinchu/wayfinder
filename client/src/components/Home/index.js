import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './style.css';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineQuestionMark } from "react-icons/md";
import { BsArrow90DegRight } from "react-icons/bs";



class Home extends Component {
  render() {
    return (
      <>
      <div className="home-container">
        <div className="button-container">
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('./faqs')}
            
          >
            <div>
              <MdOutlineQuestionMark size={'7.5vw'}/>
              <h1 className="button-text"> FAQs </h1>
            </div>
          </button>
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('./directory')}
          >
            <div>
            <BsArrow90DegRight size={'7.5vw'}/>
              <h1 className="button-text"> Directory </h1>
            </div>
          </button>
          <button 
            className="circle-button"
            onClick={() => this.props.navigate('./map')}
          >
            <div>
            <FaLocationDot size={'7.5vw'}/>
              <h1 className="button-text"> Map </h1>
            </div>
          </button>
        </div>
      </div>
      </>
    )
  }
}

export default withRouter(Home);