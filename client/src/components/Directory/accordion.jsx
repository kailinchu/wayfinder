import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AudioButton, { stopWayfinderAudio } from '../AudioButton';
import SafeImage from '../SafeImage';
import './style.css';

//This class creates the accordion menu, using MUI accordion menu api

const AccordionMenu = (props) => {    
    //destructuring the props
    const {info, startIdx, endIdx} = props;
    const [expandedKey, setExpandedKey] = useState(null);
    const [largeViewMap, setLargeViewMap] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setLargeViewMap(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    //add all the indices of objects (referring to the huge array of objects in index.js)
    //the way menu items are displayed is by index from the huge array of objects
    const indices = [];
    for(let i = startIdx; i <= endIdx; i++) {
        indices.push(i);
    }    

    const normalizeDescription = (description = '') => (
        `${description || ''}`
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/See map below\.\s+To get/g, 'See map below.\nTo get')
            .replace(/\n\s*\n+/g, '\n')
            .replace(/[ \t]+\n/g, '\n')
            .replace(/\n[ \t]+/g, '\n')
            .trim()
    );

    const getEntranceSections = (unit) => {
        const sections = [
            ['South Entrance', unit.description_south],
            ['North Entrance', unit.description_north],
            ['Emergency Entrance', unit.description_emergency],
            ['East Entrance', unit.description_east],
        ]
            .map(([label, text]) => ({ label, text: normalizeDescription(text) }))
            .filter((section) => section.text);

        if (sections.length > 0) {
            return sections;
        }

        const description = normalizeDescription(unit.description);
        return description ? [{ label: '', text: description }] : [];
    };

    const getMapEntries = (unit) => {
        const images = (unit.map_images || unit.image || '')
            .split('|')
            .map((image) => normalizeDescription(image))
            .filter(Boolean);

        const labels = (unit.map_labels || '')
            .split('|')
            .map((label) => normalizeDescription(label));

        return images.map((image, imageIndex) => ({
            src: image,
            label: labels[imageIndex] || `Map for ${unit.name}`,
        }));
    };

    const getReadAloudText = (unit) => {
        const sectionsText = getEntranceSections(unit)
            .map((section) => section.label ? `${section.label}. ${section.text}` : section.text)
            .join(' ');

        return `${unit.name}. ${sectionsText}`;
    };

    const handleAccordionChange = (key) => (_event, isExpanded) => {
        stopWayfinderAudio('accordion-change', true);
        setExpandedKey(isExpanded ? key : null);
    };


    const units = indices
        .map((idx) => info[idx])
        .filter(Boolean);

    return (
        <> 
        {units.map((unit, idx) => {
            const sections = getEntranceSections(unit);
            const maps = getMapEntries(unit);
            const key = `${unit.name}-${idx}`;

            return (
            <Accordion
                disableGutters
                key={key}
                expanded={expandedKey === key}
                onChange={handleAccordionChange(key)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={`directory-panel-${idx}-content`}
                    id={`directory-panel-${idx}-header`}
                >
                    <Typography fontWeight="600">{unit.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AudioButton
                        text={getReadAloudText(unit)}
                        label={`Read ${unit.name} directions aloud`}
                    />
                    {sections.map((section, sectionIndex) => (
                        <div className="directory-section" key={`${key}-section-${sectionIndex}`}>
                            {section.label && <h3 className="directory-section-title">{section.label}</h3>}
                            <div className="directory-description">{section.text}</div>
                        </div>
                    ))}
                    {maps.map((map, mapIndex) => (
                        <figure className="directory-map" key={`${key}-map-${mapIndex}`}>
                            <figcaption>{map.label}</figcaption>
                            <SafeImage
                                src={map.src}
                                alt={`${map.label} for ${unit.name}`}
                                className="map-image"
                            />
                            <button
                                type="button"
                                className="directory-map-large-button"
                                onClick={() => setLargeViewMap({ ...map, unitName: unit.name })}
                                aria-label={`Open larger map for ${unit.name}`}
                            >
                                Open larger map
                            </button>
                        </figure>
                    ))}
                </AccordionDetails>
            </Accordion>
        )})}
        {largeViewMap && (
            <div
                className="directory-map-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={`Large map: ${largeViewMap.label} for ${largeViewMap.unitName}`}
            >
                <div className="directory-map-lightbox-content">
                    <button
                        type="button"
                        className="directory-map-lightbox-close"
                        onClick={() => setLargeViewMap(null)}
                        aria-label="Close larger map"
                    >
                        Close
                    </button>
                    <h2>{largeViewMap.unitName}</h2>
                    <p>{largeViewMap.label}</p>
                    <SafeImage
                        src={largeViewMap.src}
                        alt={`${largeViewMap.label} large map for ${largeViewMap.unitName}`}
                        className="directory-map-lightbox-image"
                        loading="eager"
                    />
                </div>
            </div>
        )}
    </>
    );
}
export default AccordionMenu
