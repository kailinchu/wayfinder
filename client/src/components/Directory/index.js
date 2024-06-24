//imports
import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccordionMenu from './accordion';
import SearchBar from './searchbar';
import { useState } from 'react';

//array of objects to describe each unit/area in the hospital
const directory = [
  {
    name: "Administrative Department",
    description: '1st floor. See map below to locate the main floor (2nd floor) elevators.' + 
    'To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway.' +
    'The elevators will be on your right. When you exit the elevator, walk straight (around 10m). The Administrative Department will be on your right',
  }, 
  {
    name: 'Ambulatory Care Medical Clinics',
    description: '4th floor. See map below to locate the main floor elevators. To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.',
  },
  {
    name: 'Acute Medical Clinic (AMC)',
    description: 'Main floor (2nd floor). See map below. To get to AMC from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Once you pass the registration area, AMC will be on your left, beside the Fracture Clinic.',
  },
  {
    name: 'Educational Services',
    description: '1st floor. See map below to locate the main floor (2nd floor) elevators.' + 
    
    'To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.',
  },
]
var filteredDirectoryIndices =[];
//tab functionality
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props; // array destructuring for props

  //from MUI, defines props and accessibility
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {/* tabs are defined by the index*/}
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>} 
    </div>
  );
}


CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


class Directory extends React.Component {

  state = {
    value: 0, //default
    searchInput: ""
  };

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleSearchChange = (input) => {
    this.setState({value: 7});
    this.setState({searchInput: input})

    filteredDirectoryIndices = directory.filter((unit) => { //recalculated during each re-render
      return unit.name.toLowerCase().includes(input.toLowerCase()); //filters the data so that the new results only include the word typed
    });
    
    console.log(filteredDirectoryIndices);

    //add all the units which include the search term into a separate filtered array
    // for(let i = 0; i < directory.length; i++) {
    //   if(directory[i].name.toLowerCase().includes((input.toLowerCase()))) {
    //     filteredDirectoryIndices.push(i);
    //     console.log(i);
    //   }else {
    //     filteredDirectoryIndices.splice(i, i);
    //   }
    // }

  };

  render() { //runs the code everytime this class component is rendered
    // this is a key feature in react class components, DIFFERENT from functional components
    const {value} = this.state;
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Directories</h2>
          <SearchBar info={directory} onSearchChange={this.handleSearchChange}/>
        </div>


        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={this.handleChange}   variant="scrollable" scrollButtons="auto" aria-label="Alphabetical quick tabbing system for directory">
            <Tab label="A-D" />
            <Tab label="E-H" />
            <Tab label="I-L" />
            <Tab label="M-N" />
            <Tab label="O-R" />
            <Tab label="S-Z" />
            <Tab label="Units" />
            <Tab label="All"/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {/* Content for tab index 0 */}
          <AccordionMenu info={directory} startIdx={0} endIdx={1}/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={1}>
          {/* Content for tab index 1 */}
          <AccordionMenu info={directory} startIdx={3} endIdx={3}/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={2}>
          {/* Content for tab index 2 */}
          <AccordionMenu info={directory} startIdx={1} endIdx={1}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          {/* Content for tab index 2 */}
          <AccordionMenu info={directory} startIdx={1} endIdx={1}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          {/* Content for tab index 2 */}
          <AccordionMenu info={directory} startIdx={1} endIdx={1}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={5}>
          {/* Content for tab index 2 */}
          <AccordionMenu info={directory} startIdx={1} endIdx={1}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={6}>
          {/* Content for tab index 2 */}
          <AccordionMenu info={directory} startIdx={1} endIdx={1}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={7}>
          {/* Content for tab index 7. PASS filtered array into props so that the filtered units are displayed */}

          
          <AccordionMenu info={directory} startIdx={0} endIdx={directory.length-1} filteredInfo={filteredDirectoryIndices} index={7}/>
        </CustomTabPanel>

      </Box>

      </>
    );

  }
}

export default Directory;
