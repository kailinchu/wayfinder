import React from 'react';

import {useContext} from 'react'
import './NavBar.css';
import Translate from './translate.js';
import { UserContext } from '../../App'; 


 const NavLinks = ({isClicked, closeMenu}) =>{
  const {language, setLanguage } = useContext(UserContext);

    const handleClick = () => {
        if (isClicked) {
          closeMenu();
        }
      };
    
    const handleLanguageChange = (newLanguage) => {
      console.log(newLanguage);
      setLanguage(newLanguage);
    }
    

    return (
        <nav className="NavLinks">  
          <ul>
            <li onClick={handleClick}>
              <a href="./">Home</a>
            </li>
            <li onClick={handleClick}>
              <a href="./faqs">FAQs</a>
            </li>
            <li onClick={handleClick}>
              <a href="./directory">Directory</a>
            </li>
            <li onClick={handleClick}>
              <a href="./map">Map</a>
            </li>
            <li onClick={handleClick}>
              <a href="./feedback">Feedback</a>
            </li>
            <li>
            <Translate onLanguageChange={handleLanguageChange} />
            </li>
          </ul>
        </nav>
    );
 }

 export default NavLinks;