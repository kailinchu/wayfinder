import NavLinks from "./NavLinks";
import './NavBar.css';

const DesktopNavigation = () => {
  return (
    <nav className="DesktopNavigation">
      <a className="logo" href="/">
        <img src="/images/logo.png" alt="SHN WayFinder" className="logo" />
        WayFinder
      </a>
      <NavLinks />
    </nav>
  )
}

export default DesktopNavigation;
