 import './NavBar.css';
import Translate from './translate.js';
 const NavLinks = ({isClicked, closeMenu}) =>{
    const handleClick = () => {
        if (isClicked) {
          closeMenu();
        }
      };
    
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
              <Translate/>

            </li>
          </ul>

        </nav>
    );
 }

 export default NavLinks;