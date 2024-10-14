//imports
import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccordionMenu from './accordion';
import SearchBar from './searchbar';
//imports the data
import {birchmountDataDirectories} from "../../data/birchmountData" //note: must wrap in curly braces because it is a named export (not a default one)

const directory = birchmountDataDirectories;
// console.log(directory[0].name);
var filteredDirectoryIndices = directory;


//FUNCTION COMPONENT, allows for a tag for a CustomTabPanel
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

//sets the expected (required) prop types for the tab panel.
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


//MAIN CLASS COMPONENT
class Directory extends React.Component {

  //react state
  state = {
    tabIndex: 0, //default
    searchInput: ""
  };

  //sets the value to newValue
  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  //if something is searched, set the tabIndex to 7 and the searchinput to what was typed
  handleSearchChange = (input) => {
    this.setState({ tabIndex: 7 });
    this.setState({ searchInput: input })

    filteredDirectoryIndices = directory.filter((unit) => { //recalculated during each re-render
      return unit.name.toLowerCase().includes(input.toLowerCase()); //filters the data so that the new results only include the word typed
    });

  };

  render() { //runs the code everytime this class component is rendered
    // this is a key feature in react class components, DIFFERENT from functional components

    //the code below sends all the info into the accordion menus but mainly creates the tab button functionality!
    const { tabIndex } = this.state;
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
          <div class="directories-title">
            <h1 class="title">Directories</h1>
          </div>
          <SearchBar info={directory} onSearchChange={this.handleSearchChange}/>
        </div>


        <Box sx={{ width: '100%' }}>
        <div className="notranslate"> 
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={this.handleChange} variant="scrollable" scrollButtons="auto"
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

                <Tab label="A-D"/>
                <Tab label="E-H" />
                <Tab label="I-L" />
                <Tab label="M-N" />
                <Tab label="O-R" />
                <Tab label="S-Z" />
                <Tab label="Units" />
                <Tab label="All" />

            </Tabs>
          </Box>
          </div>

          <CustomTabPanel value={tabIndex} index={0}>
            {/* Content for tab index 0 */}
            <AccordionMenu info={directory} startIdx={0} endIdx={8} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={1}>
            {/* Content for tab index 1 */}
            <AccordionMenu info={directory} startIdx={9} endIdx={20} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={2}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={21} endIdx={27} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={3}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={28} endIdx={35} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={4}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={36} endIdx={44} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={5}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={45} endIdx={56} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={6}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={7}>
            {/* Content for tab index 7. PASS filtered array into props so that the filtered units are displayed */}
            <AccordionMenu info={directory} startIdx={0} endIdx={directory.length - 1} filteredInfo={filteredDirectoryIndices} index={7} />
          </CustomTabPanel>

        </Box>

      </>
    );

  }
}

export default Directory;
