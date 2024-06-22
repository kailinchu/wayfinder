import React, { Component } from 'react'
import './style.css'
import TabButtons from './TabButtons.js'
import TabContent from './TabContent.js'
import Icon from '@mui/material/Icon';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccordionMenu from './accordion'

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





//tab functionality
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
  };

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render() { //runs the code everytime this class component is rendered
    // this is a key feature in react class components, DIFFERENT from functional components
    const {value} = this.state;
    return (
      <>
      <h2>Directories</h2>

        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={this.handleChange} aria-label="basic tabs example">
            <Tab label="A-D" />
            <Tab label="E-H" />
            <Tab label="I-L" />
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
      </Box>



      </>
    );

  }
}

export default Directory;