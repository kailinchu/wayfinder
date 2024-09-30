import NavLinks from "./NavLinks";
import './NavBar.css';
import {MdOutlineMenu} from 'react-icons/md'
import { useState } from "react";
import {MdClose} from 'react-icons/md';


const MobileNavigation = ({hospitalSite, displayNavBar}) =>{
    const [click, setclick] = useState(false);

    const Hamburger = <MdOutlineMenu className="HamburgerMenu"
           size="30px" color="black"
           onClick={() => setclick(!click)} />

    const Close = <MdClose className="HamburgerMenu"
            size="30px" color="black"
           onClick={() => setclick(!click)} />

    return(
        <nav className="MobileNavigation">
            <a className="logo notranslate" href="/">
                <img src="/images/logo.png" alt="SHN WayFinder" className="logo" />
                WayFinder
            </a>
             { click ? Close : Hamburger}
             {click && displayNavBar && <NavLinks isClicked={true} closeMenu={closeMenu} hospitalSite={hospitalSite}/>}
        </nav>
    )
}

const closeMenu = () => setclick(false);

export default MobileNavigation;
