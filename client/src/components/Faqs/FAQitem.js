import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQItem({ question, answer, image }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight="600">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
        {image && <img src={image} alt="FAQ image" className="faq-image" />}
      </AccordionDetails>
    </Accordion>
  );
}

export default FAQItem;
