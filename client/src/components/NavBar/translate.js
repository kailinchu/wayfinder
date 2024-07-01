import { useEffect } from "react";
//google translate button script 

const Translate = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;

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
