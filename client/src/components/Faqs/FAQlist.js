import React from 'react';
import FAQItem from './FAQitem';
import { Container } from '@mui/material';

const faqData = [
  { question: "Is there a cafeteria/Tim Hortons?", 
    answer: "Yes. From the North Entrance (beside the Information Desk), keep walking down the main hall, straight in front of the entrance, until you see tables and the Tim Hortons on your left side.", 
  },
  { question: "Where are the washrooms?", answer: "From the North Entrance (beside the Information Desk), keep walking straight down the main hallway. You will see the washrooms on your left side along the wall. (There will also be another set of washrooms down the hallway on your right.)" },
  { question: "Where can I find a patient if I know their room number or unit?", answer: "The first digit corresponds to the patient’s floor and the second digit corresponds to the patient’s unit (1= Unit A, 2= Unit B, etc.). For example, the room number 3100 corresponds to Unit 3A. Visit the directory for more information." },
  { question: "Where can I find a patient if I do not know their room number or unit?", answer: "Please speak with the person at the Information Desk." },
  { question: "Where can I register?", answer: "From the North Entrance (beside the Information Desk), keep walking straight down the main hallway. Registration is just past the Information Desk on your left side." },
  { question: "Where is the Emergency Department?", answer: "From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors." },
  { question: "Where is the pharmacy/drug store?", answer: "From the North Entrance (beside the Information Desk), turn right immediately. The pharmacy will be on your right. " },
  { question: "Is there an ATM?", answer: "Yes, there are 2 ATMs. \n\nThere is an ATM in the Emergency Waiting Area next to the wall phone. From the North Entrance (beside the Information Desk), turn right immediately and pass through the automatic doors." },
  { question: "Where can I go to see a doctor?", answer: "If you do not have a scheduled appointment and require urgent care, please go to the Emergency Department." },
  { question: "How do I pay for parking?", answer: "There is a parking machine by the North Entrance, past the first set of automatic doors.  Place your ticket into the machine and follow the on-screen instructions. \n\nIf you have any parking issues, please ask the parking officer. A map to the Parking Office is shown below." },
  { question: "How can I pay my bills?", answer: "You can pay online or by phone (416-281-7248). Please visit https://shn.ca/pay-your-bills for more details. \n\nIf you would like to pay in person, please go to the Finance office on the 1st floor. From the North Entrance (beside the Information Desk), keep walking straight down the main hallway to the elevators, and take down to the 1st floor. Turn left as you exit the elevator." },
  { question: "How much does it cost to get a wheelchair to use while at the hospital (i.e. what coins do they take)?", answer: "You can get a wheelchair by the North Entrance, beside the Information Desk (see below). You will need a one dollar coin (loonie) to take out a wheelchair. You will get the dollar back when the wheelchair is returned." },
  { question: "I have another question.", answer: "If you do not find the question you are looking for, please go to the Information Desk. See map below." },
];

function FAQList() {
  return (
    <div className="faq-list">
      <div className="title-container">
       <h1 className="title">Frequently Asked Questions</h1>
      </div>
      {faqData.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          image={faq.image}
        />
      ))}
    </div>
  );
}

export default FAQList;