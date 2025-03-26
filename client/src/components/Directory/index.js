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
import { usePapaParse } from "react-papaparse";


//default directory data (should not be used) if somehow the parsing fails
let directory = birchmountDataDirectories;
var filteredDirectoryIndices = directory;

// Sorts directory alphabetically, numbers will appear before letters

// const sortedDirectory = [...directory].sort((a, b) => { //(DEFAULT BIRCHMOUNT DATA - SHOULD NOT STILL BE USED)
//   const nameA = a.name.toLowerCase(); // makes it case-insensitive
//   const nameB = b.name.toLowerCase();

//   if (nameA < nameB) return -1; // 'a' comes before 'b'
//   if (nameA > nameB) return 1;  // 'b' comes before 'a'
//   return 0;                     // same name
// });


// Reassign the sorted directory to the original directory (DEFAULT BIRCHMOUNT DATA - SHOULD NOT STILL BE USED)
// directory = sortedDirectory;

// Important directory items for translated sites (Important should be in the data as a T/F boolean) (DEFAULT BIRCHMOUNT DATA - SHOULD NOT STILL BE USED)
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

  if(filteredItems.length === 0){
    return { startIdx: -1, endIdx: -1 };
  }

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
    ['0', '9'],
    ['0', 'Z'],
  ];

  // Create an array to store the indices (DEFAULT BIRCHMOUNT DATA - SHOULD NOT STILL BE USED)
  // const indexList = [];

  // // Gets the start and end indexes for each letter group and puts it into an array (DEFAULT BIRCHMOUNT DATA - SHOULD NOT STILL BE USED)
  // letterGroups.forEach(([startLetter, endLetter]) => {
  //   const { startIdx, endIdx } = getLetterRangeIndices(directory, startLetter, endLetter);
  //   console.log(startIdx, endIdx);
  //     indexList.push({ startIdx, endIdx });      
    
  // });

  // console.log(indexList);  



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
    csvData: null,
  };

  //isEnglish? Language states
  componentDidMount() {
    // Initialize language detection
    this.updateLanguageState();
    this.loadCSVData();

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

      //loads csv data using react-papaparse
      loadCSVData = () => { 
        console.log(this.props.site)
        const {site} = this.props; //accesses the site from props
        const csvPath = `/data/${site}_data.csv` //dynamically changes which data is read based on which site
        fetch(csvPath)
          .then((response) => response.text())
          .then((csvString) => {
            const { readString } = usePapaParse(); 
            readString(csvString, {
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                console.log("Parsed Data:", results.data);
                this.setState({ csvData: results.data }); 
              },
            });
          })
          .catch((error) => console.error("Error fetching CSV:", error));
      };


  render() { 
   
    const { tabIndex, isEnglish, csvData } = this.state;
    console.log("Current isEnglish state:", this.state.isEnglish);
    directory = csvData ? csvData : directory; // Use CSV data if loadedz

    //dynamically alphabetize:

    const activeDirectory = [...(csvData || birchmountDataDirectories)].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    //dynamically filter important items:
    const importantDirectoryItems = activeDirectory.filter((item) => item.important === 'true');

    // dynamically generate index group
    const indexList = letterGroups.map(([startLetter, endLetter]) =>
      getLetterRangeIndices(activeDirectory, startLetter, endLetter)
    );

    return (
      <>
      

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
          <div class="directories-title">
            <h1 class="title">Directories</h1>
          </div>
          
        
          {isEnglish && ( //if the language is english, show the search bar
            <SearchBar info={activeDirectory} onSearchChange={this.handleSearchChange}/>
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

          {/* Maps through the indexList to create a tab panel for each alphabetical group units and all */}
          {indexList.map((range, idx) => (
            range.startIdx !== -1 && range.endIdx !== -1 ? ( // Only render if valid
               <CustomTabPanel key={idx} value={tabIndex} index={idx}>
                 <AccordionMenu info={activeDirectory} startIdx={range.startIdx} endIdx={range.endIdx} />
               </CustomTabPanel>
             ) : null // Do not render anything if -1
          ))} 

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
