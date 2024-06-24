import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import './style.css';

const AccordionMenu = (props) => {
    // console.log(props.startIdx, props.endIdx);
    
    //destructuring the props
    const {info, startIdx, endIdx, filteredInfo, index} = props;

    const indices = [];
    for(let i = startIdx; i <= endIdx; i++) {
        indices.push(i);
    }    
    // console.log(filteredInfo);

    const renderDescription = (description) => {
        return { __html: description.replace(/\n/g, '<br>') };
    }


    return (
        <>
        {index === 7? 
              <>
              {filteredInfo.map(unit => (
                <Accordion disableGutters key={unit.name}> 
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"    
                >
                    {unit.name}
                </AccordionSummary>
                <AccordionDetails>
                    <div dangerouslySetInnerHTML={renderDescription(unit.description)} />
                </AccordionDetails>
              </Accordion>
              ))}
            </>
        :
        <>
        {indices.map(idx => (
            <Accordion disableGutters key={idx}> 
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"    
                >
                    {info[idx].name}
                </AccordionSummary>
                <AccordionDetails>
                    <div dangerouslySetInnerHTML={renderDescription(info[idx].description)} />
                </AccordionDetails>
            </Accordion>
        ))}
        </>
    }
    </>
    );
}
export default AccordionMenu
