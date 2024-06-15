import React, { Component } from 'react'
import './style.css'
import TabButtons from './TabButtons.js'
import TabContent from './TabContent.js'

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

const petData = [
  {
    animal: "Cheetah",
    fact: "Cheetahs are the fastest land animals, capable of reaching speeds up to 75 mph.",
    image: "../src/assets/6.svg",
  },
  {
    animal: "Koala",
    fact: "Koalas sleep around 20 hours a day and are known for their eucalyptus diet.",
    image: "../src/assets/3.svg",
  },
  {
    animal: "Elephant",
    fact: "Elephants have the largest brains among land animals and demonstrate remarkable intelligence.",
    image: "../src/assets/1.svg",
  },
  {
    animal: "Zebra",
    fact: "Zebras have distinctive black and white stripes that act as a natural defense against predators.",
    image: "../src/assets/7.svg",
  },
  {
    animal: "Horse",
    fact: "Horses have excellent memory and are capable of recognizing human emotions.",
    image: "../src/assets/5.svg",
  },
];



class Directory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }


  //i is an argument
  toggle = (i) => {
    this.setState((prevState) => ({
      selected: prevState.selected === i ? null : i,
    }));
  };



  render() {
    const { selected } = this.state;

    return (
      <>
        <div className = "main__container">
          <h1>Choose your pet</h1>
          <TabButtons petData ={petData}/>
          <TabContent petData={petData} />

        </div>




        <h1>Directory</h1>
        <p>Click on a place to get directions and a map. If the location is not on the main floor, the map will direct you to the elevators. Use the search feature and alphabetized categories to quickly find a location.</p>
        <br></br>

        <span>A-E</span> <span>E-I</span>

        <div className = "wrapper">
          <div className ="accordion">

            {data.map((item, i) => (
              <div className="item" key={i}>
                <div className ="title" onClick={() => this.toggle(i)}>
                  <h2>{item.question}</h2>
                  <span>{selected === i ? '-': '+'}</span>
                </div>
                  <div className={selected === i? 'content show': 'content'}>{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );

  }
}

export default Directory;