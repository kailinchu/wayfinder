import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Fuse from 'fuse.js';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import { Divider } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useSearchParams } from 'react-router-dom';

//creates a search bar function component
const SearchLocationBar = (props) => {

    const { info, onSearchChange, startLocation, endLocation } = props; //destructuring the props
    const [searchParams] = useSearchParams();
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");
    
    const [input, setInput] = useState({
      start: "",
      end: ""
    });

    const options = {
      includeScore: true
    }

    const fuse = new Fuse(info, options);

    useEffect(() =>{// handle populate when room clicked
        setInput(prev => ({
          ...prev,
          start: startLocation,
          end: endLocation
        })); 
      
    },[startLocation, endLocation]);

    useEffect(() =>{
      if (startParam  && endParam) {
        //initially on page load check params and populate
        setInput(prev => ({
          ...prev,
          start: startParam,
          end: endParam
        }));
      }
    },[searchParams]);

    const onSearch = (input, startEnd) =>{//when an item on the dropdown is selected populate the searchbar
        if (startEnd === "start"){
          setInput(prev => ({
          ...prev,
          start: input
        }));
        }if (startEnd === "end"){
          setInput(prev => ({
          ...prev,
          end: input
        }));
        }
    };

    const sendLocations = () => {//send the value in the input fields to the make svg function
      onSearchChange(input);
    }

    const swapLocations = () => {
        setInput(prev => ({
          ...prev,
          start: input.end,
          end: input.start
        }));
    }
    
    //filter the items
    const filteritems = (inputs) => {
      //filter the item by the score 
      //display matches with associated keys less than 0.6 if any match has a key display none
      if (!inputs || inputs.trim() === '') return [];//checks if input is empty
      
      const matches = fuse.search(inputs);

       // Check for exact match (score === 0)
      if (matches.some(result => result.score === 0)) {
        return []; // Hide suggestions if exact match found
      }
      //if a search matches (returns score of 0) return empty array
      return matches.filter(result => result.score < 0.6).map(result => result.item);
    }

    //filter start and end searchbars
    const startresult = filteritems(input.start);
    //console.log("start: " + startresult);
    const endresult = filteritems(input.end);

  //styles and handles the search input
  return (
    <div id="search-box">
        <TextField 
        id="start-destination"
        placeholder="Start Location"
        value={input.start}
        onChange={(e) => setInput(prev => ({ ...prev, start: e.target.value }))} 
        sx={{
          zIndex: 0,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#48beb0', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#48beb0', // Border color when hovering
            },
            '&.Mui-focused fieldset': {
              borderColor: '#48beb0', // Border color when focused
            },
          },
        }}
        style={{width: '45vw'}}
        />
        <div className="dropdown">
        {startresult.map((item) => 
          <div className="dropdown-row" key={item} onClick={() => {onSearch(item, "start")}}>
            {item} 
            <Divider component="div" className='dropdown-divider'/>
          </div>
        )}
      </div>

        <button onClick={()=>swapLocations()} id='search-btn'><SwapVertIcon/></button>

        <div id="end-search-button-row">
          <div id="end-row">
            <TextField 
            id="end-destination" 
            placeholder="End Location"
            value={input.end}
            onChange={(e) => setInput(prev => ({ ...prev, end: e.target.value }))} 
            sx={{
              zIndex: 0,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#48beb0', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: '#48beb0', // Border color when hovering
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#48beb0', // Border color when focused
                },
              },
            }}
            style={{width: '45vw'}}
            />
          
            <div className="dropdown">
              {endresult.map((item) => 
                <div className="dropdown-row" key={item} onClick={() => {onSearch(item, "end")}}>
                  {item} 
                  <Divider component="div" className='dropdown-divider'/>
                </div>
              )}
            </div>
          </div>
          
          <div id="search-btn-container">
            <button onClick={()=>sendLocations()} id='search-btn'><SearchIcon/></button>
          </div>  
        </div>
    </div>
  
  );
};

export default SearchLocationBar;