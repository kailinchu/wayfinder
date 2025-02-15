import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const NavBar = ({hospitalSite, displayNavBar}) => {
    return(
        <div>
            <DesktopNavigation hospitalSite={hospitalSite} displayNavBar={displayNavBar}/>
            <MobileNavigation hospitalSite={hospitalSite} displayNavBar={displayNavBar}/>
        </div>
        
    )
}

export default NavBar;
