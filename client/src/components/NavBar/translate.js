import { useEffect } from "react";
//google translate button script 

//translate function component
const Translate = (props) => {

  const {onLanguageChange} = props

    //sets the initialization to create a new translate widget 
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    window.addEventListener('change', (e) => {
      const newLang = document.querySelector('.goog-te-combo').value;
      if(onLanguageChange) {
        onLanguageChange(newLang);
      }
    })
    
    useEffect(() => {
      window.googleTranslateElementInit = googleTranslateElementInit;

      //adds onto the script
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      return () => {
        document.body.removeChild(addScript);
      };

    }, []);

    return (
      <div id="google_translate_element"></div>
    );

  
};

export default Translate;
