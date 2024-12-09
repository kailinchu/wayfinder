import './NavBar.css';

 const NavLinks = ({isClicked, closeMenu, hospitalSite}) =>{
    const handleClick = () => {
        if (isClicked) {
          closeMenu();
        }
      };
    
    const currentUrl = window.location.href;
    const baseUrl = new URL(currentUrl).origin; // This gives you 'https://www.wayfinder.ca'
    
    const hospitalName = hospitalSite.charAt(0).toUpperCase() + hospitalSite.slice(1);

    return (
        <nav className="NavLinks">
          <ul>
            <li onClick={handleClick}>
              <a href={`${baseUrl}/${hospitalSite}`}>{hospitalName}</a>
            </li>
            <li onClick={handleClick}>
              <a href={`${baseUrl}/${hospitalSite}/faqs`}>FAQs</a>
            </li>
            <li onClick={handleClick}>
              <a href={`${baseUrl}/${hospitalSite}/directory`}>Directory</a>
            </li>
            <li onClick={handleClick}>
              <a href={`${baseUrl}/${hospitalSite}/map`}>Map</a>
            </li>
            <li onClick={handleClick}>
              <a href={`${baseUrl}/${hospitalSite}/feedback`}>Feedback</a>
            </li>
          </ul>

        </nav>
    );
 }

 export default NavLinks;