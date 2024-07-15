import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { withRouter } from '../../withRouter';

const NavBar = () => {
    let showNavBar = window.location.pathname !== '/'
    return(
        <div>
            <DesktopNavigation showNavBar={showNavBar}/>
            <MobileNavigation showNavBar={showNavBar}/>
        </div>
    )
}

export default withRouter(NavBar);
