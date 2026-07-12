import { useEffect } from "react";
//google translate button script 

//translate function component
const Translate = () => {
  const includedLanguages = [
    "en",
    "ar",
    "zh-TW",
    "fr",
    "es",
    "zh-CN",
    "tl",
    "ta",
    "ur",
    "pt-PT",
    "hi",
    "pa",
    "bn",
    "fa",
    "gu",
    "ko",
    "vi",
    "ru",
    "uk",
    "it",
  ].join(",");

  //sets the initialization to create a new translate widget 
  const googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) {
      return;
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        includedLanguages,
      },
      "google_translate_element"
    );
  };


  useEffect(() => {
    // check if script exists & is already initialized
    const isInitialized = document.querySelector('script[src*="translate_a/element.js"]');
    const existingGoogleScript = document.querySelector('script[src*="translate.googleapis.com"]');

    if (!(isInitialized && existingGoogleScript)) {
      window.googleTranslateElementInit = googleTranslateElementInit;

      //adds onto the script
      const addScript = document.createElement("script");
      console.log("loaded");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      addScript.async = true; 
      document.body.appendChild(addScript);
      return () => {
        document.body.removeChild(addScript);
      };
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      aria-label="Translate WayFinder website"
    ></div>
  );
};

export default Translate;
