import NavLinks from "./NavLinks";
import './NavBar.css';

const DesktopNavigation = ({hospitalSite, displayNavBar}) => {
  return (
    <nav className="DesktopNavigation">
      <a className="logo" href="/">
        <img src="/images/logo.png" alt="SHN WayFinder" className="logo" />
        WayFinder
      </a>
      {displayNavBar && <NavLinks hospitalSite={hospitalSite} />}
    </nav>
  )
}

export default DesktopNavigation;
