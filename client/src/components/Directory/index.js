//imports
import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccordionMenu from './accordion';
import SearchBar from './searchbar';

//array of objects to describe each unit/area in the hospital
const directory = [

  //index 0-8 is for first tab
  {
    name: "Administrative Department",
    description: '1st floor. See map below to locate the main floor (2nd floor) elevators.\n\n' +
      'To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. ' +
      'The elevators will be on your right. When you exit the elevator, walk straight (around 10m). The Administrative Department will be on your right.',
    image: '../../../images/Birchmount-Maps/elevators.png'
  },
  {
    name: 'Ambulatory Care Medical Clinics',
    description: '4th floor. See map below to locate the main floor elevators.\n\n To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.',
    image: '../../../images/Birchmount-Maps/elevators.png'
  },
  {
    name: 'Acute Medical Clinic (AMC)',
    description: 'Main floor (2nd floor). See map below.\n\n To get to AMC from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Once you pass the registration area, AMC will be on your left, beside the Fracture Clinic.',
    image: '../../../images/Birchmount-Maps/fracture-medicine.png'
  },
  {
    name: 'ATM',
    description: `Yes, there are 2 ATMs.\n
There is an ATM in the Emergency Waiting Area next to the wall phone. From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors.
\nThere is another ATM is in the main lobby, near the elevators. From the North Entrance (beside the Information Desk), keep walking down the main hall until you see the elevators on your right side.`,
    //NOTE, this one missing a picture because 
    //I can only do 1 picture for each accordion with how i coded it
    image: '../../../images/Birchmount-Maps/atm.png'
  },

  {
    name: 'Capital Planning',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. When you exit the elevator, walk straight all the way down the hallway. Capital Planning will be on your left.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'Cardiac Diagnostics',
    description: `Main floor (2nd floor). See map below.\n
To get to Cardiac Diagnostics from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Then, turn right into the first hallway. Continue going down that hallway. Cardiac Diagnostics will be on your left.
`,
    image: '../../../images/Birchmount-Maps/cardiac-diagnostics.png'
  },
  {
    name: 'Computers and Systems',
    description: `1st Floor. See map below to locate the main floor (2nd floor) elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. When you exit the elevator, walk straight all the way down the hallway. Computers & Systems will be on your left.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'Diabetes Clinic',
    description: `3rd floor. See map below to locate the main floor elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. When you exit the elevator, turn right.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'Diagnostic Imaging (X-Ray, CT, MRI, Ultrasound, Mammogram)',
    description: `Main floor (2nd floor). See map below.\n
To get to Diagnostic Imaging from the North Entrance (Information Desk), keep walking straight down the main hallway. Then, turn right into the first hallway. If you go all the way down that hallway, you will arrive at Diagnostic Imaging.
`,
    image: '../../../images/Birchmount-Maps/diagnostic-imaging.png'
  },


  //index 9-21 is for 2nd tab
  {
    name: 'Educational Services',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators.\n
    To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'EEG & EMG Clinic',
    description: `Main floor (2nd floor). See map below.\n
To get to the EEG & EMG Clinic from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Then, turn right into the first hallway. Continue going down that hallway. The EEG & EMG Clinic will be on your left.
`,
    image: '../../../images/Birchmount-Maps/eeg-emg.png'
  },

  {
    name: 'Elevators',
    description: `Main lobby, main floor. See map below.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'Emergency',
    description: `Main floor (2nd floor). See map below.\n
From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors.
`,
    image: '../../../images/Birchmount-Maps/emergency.png'
  },

  {
    name: 'Eye Centre',
    description: `4th floor - Unit 4E. See map below to locate the main floor elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. Turn right as you exit the elevators.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },
  {
    name: 'Finance',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. Turn left on exit from the elevator.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },
  {
    name: 'Fracture Clinic',
    description: `Main floor (2nd floor). See map below.\n
To get to the Fracture Clinic from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Once you pass the registration area, the Fracture Clinic will be on your left.
`,
    image: '../../../images/Birchmount-Maps/fracture-medicine.png'
  },
  {
    name: 'Gift Shop',
    description: `Main floor (2nd floor). See map below.\n
To get to the Gift Shop from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The Gift Shop will be on your right.
`,
    image: '../../../images/Birchmount-Maps/gift-shop.png'
  },

  {
    name: 'Health Records',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators. To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. Turn right on exit from the elevator.\n
    On Weekends: Go to Emergency Registration to access Health Records. From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },
  {
    name: 'Health Science Library',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. Turn right on exit from the elevator. The Health Sciences Library will be on your left.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'Housekeeping',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },

  {
    name: 'Human Resources (HR)',
    description: `1st floor. See map below to locate the main floor (2nd floor) elevators.\n
To get to the elevators from the North Entrance (beside the Information Desk), keep walking straight down the main hallway. The elevators will be on your right. When you exit the elevator, walk straight down the hallway. Human Resources will be on your left.
`,
    image: '../../../images/Birchmount-Maps/elevators.png'
  },




]
var filteredDirectoryIndices = directory;
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
    this.setState({ value: newValue });
  };

  handleSearchChange = (input) => {
    this.setState({ value: 7 });
    this.setState({ searchInput: input })

    filteredDirectoryIndices = directory.filter((unit) => { //recalculated during each re-render
      return unit.name.toLowerCase().includes(input.toLowerCase()); //filters the data so that the new results only include the word typed
    });

    console.log(filteredDirectoryIndices);

  };

  render() { //runs the code everytime this class component is rendered
    // this is a key feature in react class components, DIFFERENT from functional components
    const { value } = this.state;
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>Directories</h1>
          <SearchBar info={directory} onSearchChange={this.handleSearchChange} />
        </div>


        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#48beb0', // Change the color of the indicator
                },
                '& .MuiTab-root': {
                  '&.Mui-selected': {
                    color: '#48beb0', // change the color for selected
                  },
                },
              }}
              aria-label="Alphabetical quick tabbing system for directory">
              <Tab
                label="A-D"
              />
              <Tab label="E-H" />
              <Tab label="I-L" />
              <Tab label="M-N" />
              <Tab label="O-R" />
              <Tab label="S-Z" />
              <Tab label="Units" />
              <Tab label="All" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {/* Content for tab index 0 */}
            <AccordionMenu info={directory} startIdx={0} endIdx={8} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            {/* Content for tab index 1 */}
            <AccordionMenu info={directory} startIdx={9} endIdx={20} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={4}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={5}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={6}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={7}>
            {/* Content for tab index 7. PASS filtered array into props so that the filtered units are displayed */}

            <AccordionMenu info={directory} startIdx={0} endIdx={directory.length - 1} filteredInfo={filteredDirectoryIndices} index={7} />
          </CustomTabPanel>

        </Box>

      </>
    );

  }
}

export default Directory;
