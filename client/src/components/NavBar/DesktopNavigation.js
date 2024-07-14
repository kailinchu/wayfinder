import NavLinks from "./NavLinks";
import './NavBar.css';

const DesktopNavigation = (props) => {
  return (
    <nav className="DesktopNavigation">
      <a className="logo" href="/">
        <img src="/images/logo.png" alt="SHN WayFinder" className="logo" />
        WayFinder
      </a>
      {props.showNavBar && < NavLinks />}
    </nav>
  )
}

export default DesktopNavigation;
