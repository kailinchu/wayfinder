import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { track } from '@vercel/analytics/react';
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
            index: imageIndex,
        }));
    };

    const getMapsForSection = (sectionIndex, sections, maps) => {
        if (sections.length === 1 || maps.length < sections.length) {
            return maps;
        }

        if (maps.length > sections.length) {
            return [maps[sectionIndex], ...maps.slice(sections.length)].filter(Boolean);
        }

        return maps[sectionIndex] ? [maps[sectionIndex]] : [];
    };

    const handleAccordionChange = (key, itemName) => (_event, isExpanded) => {
        stopWayfinderAudio('accordion-change', true);
        setExpandedKey(isExpanded ? key : null);

        if (isExpanded) {
            track('Directory Item Opened', {
                item_name: itemName,
                site: window.location.pathname.split('/').filter(Boolean)[0] || 'unknown',
            });
        }
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
            const renderMaps = (sectionMaps, sectionIndex) => sectionMaps.map((map) => (
                <figure className="directory-map" key={`${key}-section-${sectionIndex}-map-${map.index}`}>
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
            ));

            return (
            <Accordion
                disableGutters
                key={key}
                expanded={expandedKey === key}
                onChange={handleAccordionChange(key, unit.name)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={`directory-panel-${idx}-content`}
                    id={`directory-panel-${idx}-header`}
                >
                    <Typography fontWeight="600">{unit.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {sections.map((section, sectionIndex) => {
                        const sectionMaps = getMapsForSection(sectionIndex, sections, maps);
                        const description = (
                            <div className="directory-description">{section.text}</div>
                        );

                        if (!section.label) {
                            return (
                                <div key={`${key}-section-${sectionIndex}`}>
                                    <AudioButton
                                        text={`${unit.name}. ${section.text}`}
                                        label={`Read ${unit.name} directions aloud`}
                                    />
                                    <div className="directory-section">{description}</div>
                                    {renderMaps(sectionMaps, sectionIndex)}
                                </div>
                            );
                        }

                        return (
                            <Accordion
                                disableGutters
                                key={`${key}-section-${sectionIndex}`}
                                className="directory-entrance-accordion"
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${key}-entrance-${sectionIndex}-content`}
                                    id={`${key}-entrance-${sectionIndex}-header`}
                                >
                                    <Typography fontWeight="600">
                                        Instructions from {section.label}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AudioButton
                                        text={`${unit.name}. ${section.label}. ${section.text}`}
                                        label={`Read ${section.label} directions for ${unit.name} aloud`}
                                    />
                                    <div className="directory-section">{description}</div>
                                    {renderMaps(sectionMaps, sectionIndex)}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
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
