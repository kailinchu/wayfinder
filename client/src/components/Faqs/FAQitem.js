import React, {useState} from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function FAQitem ({question, answer, image}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className = "faq-item">
      <h3 onClick={toggleAnswer} style={{ cursor: 'pointer' }}>
        {question} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </h3>
      {isOpen && (
        <>
          <p>{answer}</p>
          {image && <img src={image} alt="FAQ" className="faq-image" />}
        </>
      )}
    </div>
  );
}
export default FAQitem;