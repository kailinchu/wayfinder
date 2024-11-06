import { useState, useEffect } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import Translate from './translate.js';

const NavBar = ({hospitalSite, displayNavBar}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1050);
    
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1050);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <div>
            { isMobile ? (
                <MobileNavigation hospitalSite={hospitalSite} displayNavBar={displayNavBar}/>
            ) : (
                <DesktopNavigation hospitalSite={hospitalSite} displayNavBar={displayNavBar}/>
            )}
        </div>
    )
}

export default NavBar;
