import React, { useState, useEffect, useRef } from 'react';
import FAQItem from './FAQitem';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const faqData = [
  { question: "Is there a cafeteria/Tim Hortons?", answer: "Yes. From the North Entrance (beside the Information Desk), keep walking down the main hall, straight in front of the entrance, until you see tables and the Tim Hortons on your left side." },
  { question: "Where are the washrooms?", answer: "From the North Entrance (beside the Information Desk), keep walking straight down the main hallway. You will see the washrooms on your left side along the wall. (There will also be another set of washrooms down the hallway on your right.)" },
  { question: "Where can I find a patient if I know their room number or unit?", answer: "The first digit corresponds to the patient’s floor and the second digit corresponds to the patient’s unit (1= Unit A, 2= Unit B, etc.). For example, the room number 3100 corresponds to Unit 3A. Visit the directory for more information." },
  { question: "Where can I find a patient if I do not know their room number or unit?", answer: "Please speak with the person at the Information Desk." },
  { question: "Where can I register?", answer: "From the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Registration is just past the Information Desk on your left side." },
  { question: "Where is the Emergency Department?", answer: "From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors." },
  { question: "Where is the pharmacy/drug store?", answer: "From the North Entrance (beside the Information Desk), turn right immediately. The pharmacy will be on your right. " },
  { question: "Is there an ATM?", answer: "Yes, there are 2 ATMs. There is an ATM in the Emergency Waiting Area next to the wall phone. From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors." },
  { question: "Where can I go to see a doctor?", answer: "If you do not have a scheduled appointment and require urgent care, please go to the Emergency Department." },
  { question: "How do I pay for parking?", answer: "There is a parking machine by the North Entrance, past the first set of automatic doors. Place your ticket into the machine and follow the on-screen instructions. If you have any parking issues, please ask the parking officer." },
  { question: "How can I pay my bills?", answer: "You can pay online or by phone (416-281-7248). Please visit https://shn.ca/pay-your-bills for more details. If you would like to pay in person, please go to the Finance office on the 1st floor." },
  { question: "How much does it cost to get a wheelchair to use while at the hospital (i.e. what coins do they take)?", answer: "You can get a wheelchair by the North Entrance, beside the Information Desk (see below). You will need a one dollar coin (loonie) to take out a wheelchair. You will get the dollar back when the wheelchair is returned." },
  { question: "I have another question.", answer: "If you do not find the question you are looking for, please go to the Information Desk. See map below." },
];

const speakText = (text, lang) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-US';
    speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support text-to-speech.');
  }
};

function FAQList() {
  const [language, setLanguage] = useState('en-US');
  const faqRefs = useRef([]); 

  useEffect(() => {
    const combo = document.querySelector('.goog-te-combo');

    if (combo) {
      const updateLangFromGoogle = () => {
        const langMap = {
          en: 'en-US',
          es: 'es-ES',
          fr: 'fr-FR',
          de: 'de-DE',
          zh: 'zh-CN',
          hi: 'hi-IN',
          ar: 'ar-SA'
        };
        setLanguage(langMap[combo.value] || 'en-US');
      };

      updateLangFromGoogle();
      combo.addEventListener('change', updateLangFromGoogle);
      return () => combo.removeEventListener('change', updateLangFromGoogle);
    }
  }, []);

  const handleSpeak = (index) => {
    const node = faqRefs.current[index];
    if (node) {
      const translatedText = node.innerText; 
      speakText(translatedText, language);
    }
  };

  return (
    <div className="faq-list">
      <div className="title-container">
        <h1 className="title">Frequently Asked Questions</h1>
      </div>

      {faqData.map((faq, index) => (
        <div 
          key={index} 
          style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
        >
          <div ref={(el) => faqRefs.current[index] = el} style={{ flex: 1 }}>
            <FAQItem question={faq.question} answer={faq.answer} />
          </div>
          <IconButton
            onClick={() => handleSpeak(index)}
            aria-label="read aloud"
          >
            <VolumeUpIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default FAQList;
