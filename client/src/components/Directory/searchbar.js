import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionMenu from './accordion';

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const { info, onSearchChange } = props;

  //triggered whenever use types in the textfield (onChange is built in react event triggered whenever the value of an input field changes)
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value); //updates the state which causes the component to re-render (happens with react components)
    onSearchChange();
  };

  //filter is a method for arrays in javascript "that takes a callback function as an argument 
  //and returns a new array containing only the elements for which the callback function returns true."
  const filteredUnits = info.filter((unit) => { //recalculated during each re-render
    return unit.name.toLowerCase().includes(searchInput.toLowerCase()); //filters the data so that the new results only include the word typed
  });

  return (
    <div>
    <TextField 
        id="outlined-basic" 
        label="Find Hospital Unit/Department" 
        variant="outlined" 
        onChange={handleChange} 
        value={searchInput}/>
    <div>
      {searchInput !== ""? // ternary operator so that the tabs don't show up until something is entered into the search bar
          <>
            {filteredUnits.map(unit => (
              <Accordion disableGutters key={unit.name}> 
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1-content"
                  id="panel1-header"    
              >
                  {unit.name}
              </AccordionSummary>
              <AccordionDetails>
                  {unit.description}
              </AccordionDetails>
            </Accordion>
            ))}
          </>
          : 
          <h1></h1>
      }  
                
        
      
      
      
      </div>
    </div>
  );
};

export default SearchBar;

