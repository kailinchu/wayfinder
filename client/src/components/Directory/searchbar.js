import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const { info, onSearchChange } = props;

  //triggered whenever use types in the textfield (onChange is built in react event triggered whenever the value of an input field changes)
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value); //updates the state which causes the component to re-render (happens with react components)
    onSearchChange(e.target.value);
  };

  return (
    <div>
    <TextField 
        id="outlined-basic" 
        label="Find Hospital Unit/Department" 
        variant="outlined" 
        onChange={handleChange} 
        value={searchInput}
        InputProps={{
        startAdornment: <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>,
        }}

        />
    </div>
  );
};

export default SearchBar;

