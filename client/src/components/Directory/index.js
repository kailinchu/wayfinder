//imports
import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccordionMenu from './accordion';
import SearchBar from './searchbar';
import {birchmountDataDirectories} from "../../data/birchmountData" //note: must wrap in curly braces because it is a named export (not a default one)

let directory = birchmountDataDirectories;
var filteredDirectoryIndices = directory;

// Sorts the directory alphabetically
const sortedDirectory = [...directory].sort((a, b) => {
  const nameA = a.name.toLowerCase(); // makes it case-insensitive
  const nameB = b.name.toLowerCase();

  if (nameA < nameB) return -1; // 'a' comes before 'b'
  if (nameA > nameB) return 1;  // 'b' comes before 'a'
  return 0;                     // same name
});


// Reassign the sorted directory to the original directory
directory = sortedDirectory;

// Important directory items for translated sites (Important should be in the data as a T/F boolean)
const importantDirectoryItems = directory.filter((item) => item.important === 'true');


// Gets ranges of indices for each letter group
function getLetterRangeIndices(directory, startLetter, endLetter) {
  //makes comparison case-insensitive
  const startLetterLower = startLetter.toLowerCase();
  const endLetterLower = endLetter.toLowerCase();

  // Filter the directory to find items that start with letters between startLetter and endLetter
  const filteredItems = directory.filter(item => {
    const firstLetter = item.name[0].toLowerCase(); 
    return firstLetter >= startLetterLower && firstLetter <= endLetterLower;
  });

  // Get the start index 
  const startIdx = directory.indexOf(filteredItems[0]);

  // Get the end index 
  const endIdx = directory.indexOf(filteredItems[filteredItems.length - 1]);

  return { startIdx, endIdx };
}

  // Letter groups for range (Hard Coded for now)
  const letterGroups = [
    ['A', 'D'],
    ['E', 'H'],
    ['I', 'L'],
    ['M', 'N'],
    ['O', 'R'],
    ['S', 'Z'],
  ];

  // Create an array to store the indices
  const indexList = [];

  // Gets the start and end indexes for each letter group and puts it into an array
  letterGroups.forEach(([startLetter, endLetter]) => {
    const { startIdx, endIdx } = getLetterRangeIndices(directory, startLetter, endLetter);
    indexList.push({ startIdx, endIdx });
  });

  console.log(indexList);  



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
    searchInput: "",
    isEnglish: true, //sets default language state
  };

  //isEnglish? Language states
  componentDidMount() {
    // Initialize language detection
    this.updateLanguageState();

    // Observe changes to the `lang` attribute on <html>
    this.observer = new MutationObserver(() => {
      this.updateLanguageState();
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  componentWillUnmount() {
    // Cleanup observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Updates 'isEnglish' state based on the `lang` attribute on <html>
  updateLanguageState = () => {
    const lang = document.documentElement.lang;
    this.setState({ isEnglish: lang === "en" });
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

  render() { 
   

    //the code below sends all the info into the accordion menus but mainly creates the tab button functionality!
    const { tabIndex, isEnglish } = this.state;
    console.log("Current isEnglish state:", this.state.isEnglish);

    return (
      <>
      

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
          <div class="directories-title">
            <h1 class="title">Directories</h1>
          </div>
        
          {isEnglish && ( //if the language is english, show the search bar
            <SearchBar info={directory} onSearchChange={this.handleSearchChange}/>
          )}
        </div>

        {isEnglish && ( //english tabs (all items)
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

            {/* Gets the start and end indices for each alphabetical group from the indexList */}
          <CustomTabPanel value={tabIndex} index={0}>
            {/* Content for tab index 0 */}
            <AccordionMenu info={directory} startIdx={indexList[0].startIdx} endIdx={indexList[0].endIdx} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={1}>
            {/* Content for tab index 1 */}
            <AccordionMenu info={directory} startIdx={indexList[1].startIdx} endIdx={indexList[1].endIdx} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={2}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={indexList[2].startIdx} endIdx={indexList[2].endIdx} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={3}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={indexList[3].startIdx} endIdx={indexList[3].endIdx} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={4}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={indexList[4].startIdx} endIdx={indexList[4].endIdx} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={5}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={indexList[5].startIdx} endIdx={indexList[5].endIdx} />
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={6}>
            {/* Content for tab index 2 */}
            <AccordionMenu info={directory} startIdx={1} endIdx={1} /> {/* I dont know how to make the units like customizable */}
          </CustomTabPanel>

          <CustomTabPanel value={tabIndex} index={7}>
            {/* Content for tab index 7. PASS filtered array into props so that the filtered units are displayed */}
            <AccordionMenu info={directory} startIdx={0} endIdx={directory.length - 1} filteredInfo={filteredDirectoryIndices} index={7} />
          </CustomTabPanel>

        </Box>
        )}

      {/* Box for non-english languages, only items marked important*/}
      {!isEnglish && (
        <Box sx={{ width: '100%' }}>

          <CustomTabPanel value={tabIndex} index={0}>
            {/* Content for tab index 0 */}
            <AccordionMenu info={importantDirectoryItems} startIdx={0} endIdx={importantDirectoryItems.length - 1} />
          </CustomTabPanel>


        </Box>
        )}


      </>
    );

  }
}

export default Directory;
