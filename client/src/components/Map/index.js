import React, { useEffect, useState } from 'react';
import SafeImage from '../SafeImage';
import './style.css';

const centenaryFloorMaps = [
  {
    floor: '1',
    title: 'Floor 1',
    maps: [{ label: 'Floor 1 Main Map', src: '/images/centenary-maps/floor-1-main-copy.png' }],
  },
  {
    floor: '2',
    title: 'Floor 2',
    maps: [{ label: 'Floor 2 Main Map', src: '/images/centenary-maps/lvl-2-main-copy.png' }],
  },
  {
    floor: '3',
    title: 'Floor 3',
    maps: [{ label: 'Floor 3 Main Map', src: '/images/centenary-maps/lvl-3-main-copy.png' }],
  },
  {
    floor: '4',
    title: 'Floor 4',
    maps: [
      { label: 'Floor 4 Tower Main Map', src: '/images/centenary-maps/lvl-4-tower-main-copy.png' },
      { label: 'Floor 4 Margaret Birch Wing Main Map', src: '/images/centenary-maps/lvl-4-mbw-main-copy.png' },
    ],
  },
  {
    floor: '5',
    title: 'Floor 5',
    maps: [{ label: 'Floor 5 Main Map', src: '/images/centenary-maps/lvl-5-main-copy.png' }],
  },
  {
    floor: '6',
    title: 'Floor 6',
    maps: [{ label: 'Floor 6 Main Map', src: '/images/centenary-maps/lvl-6-main-copy.png' }],
  },
  {
    floor: '7',
    title: 'Floor 7',
    maps: [{ label: 'Floor 7 Main Map', src: '/images/centenary-maps/level-7-main-copy.png' }],
  },
  {
    floor: '8',
    title: 'Floor 8',
    maps: [{ label: 'Floor 8 Main Map', src: '/images/centenary-maps/level-8-main-copy.png' }],
  },
  {
    floor: '9',
    title: 'Floor 9',
    maps: [{ label: 'Floor 9 Main Map', src: '/images/centenary-maps/level-9-main-copy.png' }],
  },
  {
    floor: '10',
    title: 'Floor 10',
    maps: [{ label: 'Floor 10 Main Map', src: '/images/centenary-maps/level-10-main-copy.png' }],
  },
  {
    floor: '11',
    title: 'Floor 11',
    maps: [{ label: 'Floor 11 Main Map', src: '/images/centenary-maps/level-11-main-copy.png' }],
  },
  {
    floor: '12',
    title: 'Floor 12',
    maps: [{ label: 'Floor 12 Main Map', src: '/images/centenary-maps/level-12-main-copy.png' }],
  },
  {
    floor: '14',
    title: 'Floor 14',
    maps: [{ label: 'Floor 14 Main Map', src: '/images/centenary-maps/level-14-main-copy.png' }],
  },
];

const Map = ({ site }) => {
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [largeViewMap, setLargeViewMap] = useState(null);
  const selectedFloorData = centenaryFloorMaps.find((floorMap) => floorMap.floor === selectedFloor);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLargeViewMap(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (site !== 'centenary') {
    const mapImagePath = `/images/${site}-maps/general.png`;

    return (
      <>
        <div className="title-container">
          <h1 className="title">Map</h1>
        </div>
        <SafeImage
          src={mapImagePath}
          alt={`${site} hospital overview map`}
          className="map"
          loading="eager"
        />
      </>
    );
  }

  return (
    <>
      <div className="title-container">
        <h1 className="title">Maps</h1>
      </div>

      <section className="floor-browser" aria-labelledby="floor-browser-title">
        <div className="floor-browser-heading">
          <h2 id="floor-browser-title">Centenary floor maps</h2>
          <p>Select a floor to view the current launch map. Floor 13 is intentionally skipped.</p>
        </div>

        <div className="floor-controls" role="tablist" aria-label="Select a Centenary floor map">
          {centenaryFloorMaps.map((floorMap) => (
            <button
              key={floorMap.floor}
              type="button"
              className={`floor-control ${selectedFloor === floorMap.floor ? 'active' : ''}`}
              onClick={() => setSelectedFloor(floorMap.floor)}
              role="tab"
              aria-selected={selectedFloor === floorMap.floor}
              aria-controls="selected-floor-panel"
            >
              Floor {floorMap.floor}
            </button>
          ))}
        </div>

        <div id="selected-floor-panel" className="selected-floor-panel" role="tabpanel">
          <h3>{selectedFloorData.title}</h3>
          <div className="floor-map-grid">
            {selectedFloorData.maps.map((map) => (
              <figure className="floor-map-card" key={map.src}>
                <figcaption>{map.label}</figcaption>
                <SafeImage
                  src={map.src}
                  alt={`${map.label} for Centenary hospital`}
                  className="floor-map-image"
                />
                <button
                  type="button"
                  className="large-view-button"
                  onClick={() => setLargeViewMap(map)}
                  aria-label={`Open large view for ${map.label}`}
                >
                  Open large view
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {largeViewMap && (
        <div className="map-lightbox" role="dialog" aria-modal="true" aria-label={`Large view: ${largeViewMap.label}`}>
          <div className="map-lightbox-content">
            <button
              type="button"
              className="map-lightbox-close"
              onClick={() => setLargeViewMap(null)}
              aria-label="Close large map view"
            >
              Close
            </button>
            <h2>{largeViewMap.label}</h2>
            <SafeImage
              src={largeViewMap.src}
              alt={`${largeViewMap.label} large view for Centenary hospital`}
              className="map-lightbox-image"
              loading="eager"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
