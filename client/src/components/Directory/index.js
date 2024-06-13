import React, { Component } from 'react'
import './style.css'

const data = [ 
  {
    question: 'Administrative Department',
    answer: '1st floor. See map below to locate the main floor (2nd floor) elevators.' + 
    'To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway.' +
    'The elevators will be on your right. When you exit the elevator, walk straight (around 10m). The Administrative Department will be on your right',
  },
  {
    question: 'Ambulatory Care Medical Clinics',
    answer: '4th floor. See map below to locate the main floor elevators. To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.',
  },
  {
    question: 'Acute Medical Clinic (AMC)',
    answer: 'Main floor (2nd floor). See map below. To get to AMC from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Once you pass the registration area, AMC will be on your left, beside the Fracture Clinic.',
  },
]


class Directory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  toggle = (i) => {
    this.setState((prevState) => ({
      selected: prevState.selected === i ? null : i,
    }));
  };



  render() {
    const { selected } = this.state;

    return (
      <>
        <h1>Directory</h1>
        <div className = "wrapper">
          <div className ="accordion">

            {data.map((item, i) => (
              <div className="item" key={i}>
                <div className ="title" onClick={() => this.toggle(i)}>
                  <h2>{item.question}</h2>
                  <span>{selected === i ? '-': '+'}</span>
                </div>

                {selected === i && (
                  <div className="content">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );

  }
}

export default Directory;