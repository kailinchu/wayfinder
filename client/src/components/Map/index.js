import React, { useEffect, useState } from 'react';
import SafeImage from '../SafeImage';
import './style.css';
import SearchLocationBar from './searchlocation.js';

const centenaryFloorMaps = [//add a list of valid locations
  {
    floor: '1',
    title: 'Floor 1',
    maps: [{ label: 'Floor 1 Main Map', src: '/images/centenary-maps/Floor-1-room-graph.svg' }],
    info: [{
      validLocations: [
        'Security',
        'Hemodialysis',
        'Registration Kiosks',
        'Breast Clinic / Bone Mineral Density & Laboratory Reception and Waiting Room',
        'Occupational Therapy & Physiotherapy',
        'Speech & Audiology',
        'Patient Registration',
        'MRI',
        'Palliative Hub',
        'G.A.I.N. Clinic',
        'Volunteer Services',
        'Patient Billing & Payroll',
        'Medical Device Reprocessing Department (MDRD)',
        'Diabetes Program',
        'Health Records',
        'Workspace',
        'Health & Safety',
        'Diabetes Education Theatre',
        'Tunnel to Shoniker Building',
        'Cancer Care & Hematology Clinic',
        'Thyroid Rapid Diagnostic Clinic',
        'Human Resources',
        'Medical Mall',
        'North Parking',
        'South Parking Office',
        'South Stairs',
        'South Washroom',
        'South Elevator',
        'West Stairs',
        'West Washroom',
        'West Elevator',
        'East Stairs',
        'North Elevator',
        'North Washroom',
        'North Stairs'
      ]
    }],  
  },
  {
    floor: '2',
    title: 'Floor 2',
    maps: [{ label: 'Floor 2 Main Map', src: '/images/centenary-maps/Floor-2-room-graph.svg' }],
    info: [{
      validLocations: [
        'Emergency',
        'Fracture Clinic',
        'Cath Lab Code STEMI',
        'Intensive Care Unit (ICU)',
        'Arrhythmia Clinic Cardiac Diagnostics',
        'Diagnostic Imaging',
        'Surgical Specialty Clinics',
        'Worship & Meditation',
        'Endoscopy Clinic',
        'Pulmonary Function Test (PFT) Lab',
        'Life Labs',
        'SHN Foundation Office',
        'Same Day Surgery',
        'Gynecology',
        'Maternal Fetal Medicine Clinic',
        'Obstetric Medicine Clinic',
        'Neonatal Intensive Care Unit (NICU)',
        'Information Desk',
        'Gift Shop',
        'Lifemark Physiotherapy Sports Medicine',
        'Parking Office',
        'Retail Pharmacy (Shoppers Drug Mart)',
        'Family Birthing Centre',
        'Food Court',
        'South Washroom',
        'West Washroom',
        'North Washroom',
        'South Elevator',
        'East Elevator',
        'North Elevator',
        'South Stairs',
        'Southeast Stairs',
        'Small East Stairs',
        'East Stairs',
        'North Stairs',
        'East Washroom',
        'Small East Washroom'
      ]
    }], 
  },
  {
    floor: '3',
    title: 'Floor 3',
    maps: [{ label: 'Floor 3 Main Map', src: '/images/centenary-maps/Floor-3-room-graph.svg' }],
    info: [{
      validLocations: [
        "Restorative Rehabilitation Unit 3E",
        "Restorative Rehabilitation Unit 3W",
        "Administration",
        "Nutrition and Food Services",
        "Board Room C3D",
        "Meeting Room C3B",
        "Conference Room C3A",
        "Atrium Lounge Area",
        "South Elevator",
        'South Stairs',
        'West Stairs',
        'Tower Elevator',
        'North Stairs',
        'East Bathroom (Female)',
        'East Bathroom (Male)',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '4',
    title: 'Floor 4',
    maps: [
      { label: 'Floor 4 Tower Main Map', src: '/images/centenary-maps/Floor-4-tower-room-graph.svg' },
      { label: 'Floor 4 Margaret Birch Wing Main Map', src: '/images/centenary-maps/Floor-4-mbw-room-graph.svg' },
    ],
    info: [{
      validLocations: [
        "Dietian's Office",
        "South Stairs ",
        "Medicine Clinic",
        "Hemodialysis Zone B",
        "Ortho Rapid Access Clinic (ORAC)",
        "West Stairs",
        "East Stairs",
        "East Elevator",
        "Genetics Clinic",
        "Cardiology Unit",
        "Coronary Care Unit",
        "South Bathroom",
        "West Elevator",
        "North Stairs",
        "West Bathroom"
      ]
    }]
  },
  {
    floor: '5',
    title: 'Floor 5',
    maps: [{ label: 'Floor 5 Main Map', src: '/images/centenary-maps/Floor-5-room-graph.svg' }],
    info: [{
      validLocations: [
        "Nursing Station",
        "Rehabilitation Unit 5E",
        "Lounge Area",
        "Surgical Unit 5W",
        "Rehab Gym",
        "East Stairs",
        "South Elevator",
        "South Washroom",
        "West Washroom",
        "West Stairs"
      ]
    }]
  },
  {
    floor: '6',
    title: 'Floor 6',
    maps: [{ label: 'Floor 6 Main Map', src: '/images/centenary-maps/Floor-6-room-graph.svg' }],
    info: [{
      validLocations: [
        'Mood & Anxiety Clinic',
        'Outpatient Mental Health 6W',
        'West Stairs',
        'West Washroom',
        'South Elevator',
        'East Elevator'
      ]
    }]
  },
  {
    floor: '7',
    title: 'Floor 7',
    maps: [{ label: 'Floor 7 Main Map', src: '/images/centenary-maps/Floor-7-room-graph.svg' }],
    info: [{
      validLocations: [
        'Newborn Assessment Clinic',
        'Kids Care Clinic',
        'Kids Care Unit 7W',
        'Healthy Outcome Pediatric Program of Scarborough (HOPPS) Clinic',
        'Kids Care (POGO) Clinic',
        'Acute Care',
        'West Stairs',
        'West Bathroom',
        'South Bathroom',
        'South Elevator',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '8',
    title: 'Floor 8',
    maps: [{ label: 'Floor 8 Main Map', src: '/images/centenary-maps/Floor-8-room-graph.svg' }],
    info: [{
      validLocations: [
        'Medicine Unit 8E',
        'Medicine Unit 8SW',
        'Child & Adolescent Mental Health Unit 8NW',
        'West Stairs',
        'West Bathroom',
        'East Bathroom',
        'South Bathroom',
        'South Elevator',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '9',
    title: 'Floor 9',
    maps: [{ label: 'Floor 9 Main Map', src: '/images/centenary-maps/Floor-9-room-graph.svg' }],
    info: [{
      validLocations: [
        'Medicine Unit 9E',
        'Medicine Unit 9W',
        'West Stairs',
        'West Bathroom',
        'South Bathroom',
        'South Elevator',
        'East Elevator',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '10',
    title: 'Floor 10',
    maps: [{ label: 'Floor 10 Main Map', src: '/images/centenary-maps/Floor-10-room-graph.svg' }],
    info: [{
      validLocations: [
        'Psychiatric Intensive Care Unit (PICU) 10E',
        'Mental Health & Psychiatric Intensive Care Unit (PICU) 10W',
        '10W Care Station',
        'West Stairs',
        'South Elevator',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '11',
    title: 'Floor 11',
    maps: [{ label: 'Floor 11 Main Map', src: '/images/centenary-maps/Floor-11-room-graph.svg' }],
    info: [{
      validLocations: [
        'Finance Procurement',
        'Lounge Area',
        'Kandhal & Singh Cardiovascular Education Theatre C11A',
        'Labraico Cardiovascular Rehabilitation',
        'Cardiac Program Call Centre',
        'South Elevator',
        'North Bathroom (Male)',
        'North Bathroom (Female)',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '12',
    title: 'Floor 12',
    maps: [{ label: 'Floor 12 Main Map', src: '/images/centenary-maps/Floor-12-room-graph.svg' }],
    info: [{
      validLocations: [
        'Kids and Teens Care Specialty Clinics',
        'Patient Safety',
        'Privacy & Risk Management',
        'Professional Practice',
        'Quality Office',
        'Strategy & Transformation',
        'Trillium Gift of Life',
        'West Stairs',
        'North Elevator',
        'South Bathroom',
        'East Stairs'
      ]
    }]
  },
  {
    floor: '14',
    title: 'Floor 14',
    maps: [{ label: 'Floor 14 Main Map', src: '/images/centenary-maps/Floor-14-room-graph.svg' }],
    info: [{
      validLocations: [
        'Payroll Office',
        'Patient Billing',
        'Enterprise Analytics',
        'Digital Services',
        'Biomedical Engineering',
        'Support Services / Resource Centre',
        'Environmental Services (EVS)',
        'Plant & Facilities Operations',
        'West Stairs',
        'East Elevator',
        'East Bathroom (Female)',
        'East Bathroom (Male)',
        'East Stairs',
        'East Bathroom'
      ]
    }]
  },
];

const svgMapLabels = [
  "Floor 1 Main Map",
  "Floor 2 Main Map",
  "Floor 3 Main Map",
  "Floor 4 Tower Main Map",
  "Floor 4 Margaret Birch Wing Main Map",
  "Floor 5 Main Map",
  "Floor 6 Main Map",
  "Floor 7 Main Map",
  "Floor 8 Main Map",
  "Floor 9 Main Map",
  "Floor 10 Main Map",
  "Floor 11 Main Map",
  "Floor 12 Main Map",
  "Floor 14 Main Map"
];

let selectedRooms = [];

const Map = ({ site }) => {
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [largeViewMap, setLargeViewMap] = useState(null);
  const selectedFloorData = centenaryFloorMaps.find((floorMap) => floorMap.floor === selectedFloor);
  const [svgContent, setSvgContent] = useState({
    map1: "",
    map2: ""
  });
  const [roomSelect, setRoomSelect] = useState({
    start: "",
    end: ""
  });
  const [map1Selected, setMap1Selected] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLargeViewMap(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(()=>{
    setRoomSelect(prev => ({
      ...prev,
      start: "",
      end: ""
    }));
  },[selectedFloor]);

  const loadSvg = async () => {
    if (selectedFloorData.maps.at(0) && selectedFloorData.maps.at(1)){
      //make a new function that can add both src or edit current
      makeSVG(selectedFloorData.maps.at(0).src, selectedFloorData.maps.at(1).src);

      return;
    }

    const map = selectedFloorData.maps.find(
      (map) => svgMapLabels.includes(map.label)
    );

    if (!map) return;
    
    makeSVG(map.src);
  }

  const makeSVG = async (src1, src2) => {
        const response = await fetch(src1);
        const svgText = await response.text();

        
        let svgText2 = "";

        if (src2) {
          const response2 = await fetch(src2);
          svgText2 = await response2.text();
        }

        setSvgContent(prev => ({
          ...prev,
          map1: svgText,
          map2: svgText2
        }));

        const svg = document.querySelector('#svg-content svg');
        const svg2 = document.querySelector('#svg-content2 svg');

        if (svg) {
          svg.onclick = (event) => {
            const targetFill = event.target
              .getAttribute?.('fill')
              ?.toLowerCase();

            setMap1Selected(true);

            if (
              targetFill === 'white' ||
              targetFill === '#fffefe'
            ) {
              return;
            }

            const elements = document.elementsFromPoint(
              event.clientX,
              event.clientY
            );

            const room = elements.find((element) => {
              const fill = element
                .getAttribute?.('fill')
                ?.toLowerCase();

              return (
                fill === 'white' ||
                fill === '#fffefe'
              );
            });

            if (!room) return;

            // Trigger the EXISTING room onclick
            room.dispatchEvent(
              new MouseEvent('click', {
                bubbles: false,
                cancelable: true,
                view: window,
                clientX: event.clientX,
                clientY: event.clientY
              })
            );
          };
        }

        if (svg2) {
          svg2.onclick = (event) => {
            const targetFill = event.target
              .getAttribute?.('fill')
              ?.toLowerCase();

            setMap1Selected(false);

            if (
              targetFill === 'white' ||
              targetFill === '#fffefe'
            ) {
              return;
            }

            const elements = document.elementsFromPoint(
              event.clientX,
              event.clientY
            );

            const room = elements.find((element) => {
              const fill = element
                .getAttribute?.('fill')
                ?.toLowerCase();

              return (
                fill === 'white' ||
                fill === '#fffefe'
              );
            });

            if (!room) return;

            // Trigger the EXISTING room onclick
            room.dispatchEvent(
              new MouseEvent('click', {
                bubbles: false,
                cancelable: true,
                view: window,
                clientX: event.clientX,
                clientY: event.clientY
              })
            );
          };
        }
        
        const rooms = [
          ...document.querySelectorAll('[fill="white"], [fill="#FFFEFE"]')
        ];

        const path = Array.from(document.querySelectorAll('path[fill="#949090"]'));
        path.forEach(rects => {
          rects.setAttribute('opacity', 0); // set opacity of the rectangles to 0
        });

        rooms.forEach((room) =>{
          room.style.cursor = 'pointer';
            room.onclick = () => {
              if (selectedRooms.includes(room)) return;
              
              selectedRooms.push(room);
              room.setAttribute('stroke', 'red');
              if(selectedRooms.length === 1){
                setRoomSelect(prev => ({ 
                  ...prev,
                  start: room.id 
                }));
              }
              if (selectedRooms.length === 2) {
                setRoomSelect(prev => ({ 
                  ...prev,
                  end: room.id 
                }));

                makePath(selectedRooms[0], selectedRooms[1], map1Selected);
                selectedRooms = [];
              }
            }      
        });
  };

  loadSvg();

  const getCenter = (rect) => {
          const rectBBox = rect.getBBox();
          return {
            x: rectBBox.x + rectBBox.width / 2,
            y: rectBBox.y + rectBBox.height / 2
          };
        }

  const isOverLapping = (rectA, rectB) =>{
          const Axy1 = rectA.getBBox();//top left of the rectangle
          const Axy2 = { //bottom right
            x: Axy1.x + Axy1.width,
            y: Axy1.y + Axy1.height
          };

          const Bxy1 = rectB.getBBox();//top left of the rectangle
          const Bxy2 = {//bottom right
            x: Bxy1.x + Bxy1.width,
            y: Bxy1.y + Bxy1.height
          }

          if (Axy1.x < Bxy2.x && Axy2.y > Bxy1.y && Axy2.x > Bxy1.x && Bxy2.y > Axy1.y) return true;

        return false;
  }

  const bfs = (start, end, path) => {
          let queue = [];
          let result = [];
          let visited = new Set([start]);
          let parent = new globalThis.Map();

          queue.push(start);

          while (queue.length > 0) {
            let currentNode = queue.shift();
            if (currentNode === end) break;//stop once the current node is the end rect
            
            for (let rect of path) {
              if (!visited.has(rect) && isOverLapping(currentNode, rect)) {
                visited.add(rect);
                parent.set(rect, currentNode); // set current node as the parent of next valid rect
                queue.push(rect);//add valid rectangles to the queue
              }
            }
          }

          let node = end;
          while (node && node !== start) {//trace back the ancestors of the end node until you reach the start
            result.push(node);
            node = parent.get(node);
            if (node === start) result.push(start);
          }
        return result;
    }

  const findClosestRect = (room, rects) => {
          let closestRectangle = null;
          let closestDistance = Infinity;
          const roomCenter = getCenter(room);

          rects.forEach(rect => {
            const rectCenter = getCenter(rect);

            // find the distance of the room to each of the rectangles
            const dist = Math.sqrt(
              Math.pow(roomCenter.x - rectCenter.x, 2) +
              Math.pow(roomCenter.y - rectCenter.y, 2)
            );

            if (dist < closestDistance) {
              closestRectangle = rect;
              closestDistance = dist;
            }
          });

    return closestRectangle;
  }

  const makePath = async (room1, room2, map1Selected) => {
    //remove red border
    room1.setAttribute('stroke', '#C9C4C0');
    room2.setAttribute('stroke', '#C9C4C0');

    //where are the rooms? if both are in svg-content2 then map1Selected = false
    const room1Map = room1?.closest('#svg-content, #svg-content2');
    const room2Map = room2?.closest('#svg-content, #svg-content2');

    console.log(room1Map?.id, room2Map?.id);
    
    if (room1Map?.id !== room2Map?.id) {
      console.log('Rooms are on different maps');
      alert('Rooms are on different maps');
      return;
    }
     
    const path = [...document.querySelectorAll('path[fill="#949090"]')];
    const doorDots = [...document.querySelectorAll('path[fill="#525C5C"]')];

    // find closest dot to start and end room
    const closestStartDot = findClosestRect(room1, doorDots);
    const closestEndDot = findClosestRect(room2, doorDots);

    // find closest rect to the dots
    const startRect = findClosestRect(closestStartDot, path);
    const endRect = findClosestRect(closestEndDot, path);

    //run bfs between the rectangles and save the result path
    const resultpath = bfs(startRect, endRect, path);
        
    const points = resultpath.map(getCenter).map(c => `${c.x},${c.y}`).join(' ');

    const oldLine = document.querySelector('#room-connector');//find old line and remove it
    if (oldLine) oldLine.remove();

    if (points) {//if a path is returned then create a line using the coordinates
      const svg = document.querySelector('#svg-content svg'); // || svg content2

      const svg2 = document.querySelector('#svg-content2 svg');

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      line.setAttribute('id', 'room-connector');
      line.setAttribute('points', points);
      line.setAttribute('stroke', 'blue');
      line.setAttribute('stroke-width', '5');
      line.setAttribute('fill', 'none');
      
      console.log(map1Selected, selectedFloor);

      if ((map1Selected && svg) || selectedFloor !== '4'){
        svg.appendChild(line);
      } else if (!map1Selected && svg2 && selectedFloor === '4') {
        svg2.appendChild(line);
      }

      document
      .getElementById('room-connector')
      ?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
      });
    }
  };

  const handleSearchChange = (input) => {//set make path using the info from the search bars
    const svg = document.querySelector('#svg-content svg');
    const svg2 = document.querySelector('#svg-content2 svg');
    const whiteRooms = [...document.querySelectorAll('path[fill="white"]')];

    if (!svg) {
      console.log("SVG not loaded yet");
      return;
    }

    if (!svg2 && selectedFloor === '4') {
      console.log("SVG2 not loaded yet");
      return;
    }

    //the start and end location input boxes
    const room1 = document.getElementById(input.start);
    const room2 = document.getElementById(input.end);

    //where are the rooms? if both are in svg-content2 then map1Selected = false
    const room1Map = room1?.closest('#svg-content, #svg-content2');
    const room2Map = room2?.closest('#svg-content, #svg-content2');

    if (room1Map?.id !== room2Map?.id) {
      console.log('Rooms are on different maps');
      alert('Rooms are on different maps');
      return;
    }

    const selectedMap1 = room1Map?.id === 'svg-content';

    setMap1Selected(selectedMap1);

    setRoomSelect(prev => ({
          ...prev,
          start: input.start,
          end: input.end
    }));
    
    if (room1 && room2) {
      makePath(room1, room2, selectedMap1);
      whiteRooms.forEach(rooms => {
        rooms.setAttribute('stroke', '#C9C4C0');
        selectedRooms = [];
      });
    } else {
      selectedRooms = [];
      console.log("failed");
    }
  };

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
          <p>Select a floor to view the current launch map.</p>
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

        {selectedFloorData.info.map((map) => (
          <div key={map}>
              <SearchLocationBar
                info={map.validLocations}
                onSearchChange={handleSearchChange} 
                startLocation={roomSelect.start}
                endLocation={roomSelect.end}
              />
          </div>
        ))}
        
        {!largeViewMap && (
          <div id="selected-floor-panel" className="selected-floor-panel" role="tabpanel">
          <h3>{selectedFloorData.title}</h3>
          <div className="floor-map-grid">
            {selectedFloorData.maps.map((map) => (
              <figure className="floor-map-card" key={map.src}>
                <figcaption>{map.label}</figcaption>
                {!(svgMapLabels.includes(map.label)) && <SafeImage
                  src={map.src}
                  alt={`${map.label} for Centenary hospital`}
                  className="floor-map-image"
                />}

                {(svgMapLabels.includes(map.label) && !(map.label === "Floor 4 Margaret Birch Wing Main Map")) && 
                <div
                  alt={`${map.label} for Centenary hospital`}
                  id='svg-content'
                  className="floor-map-image"
                  dangerouslySetInnerHTML={{ __html: svgContent.map1 }}
                /> }

                {((svgMapLabels.includes(map.label)) && svgContent.map2 && map.label === "Floor 4 Margaret Birch Wing Main Map") && 
                <div
                  alt={`${map.label} for Centenary hospital`}
                  id='svg-content2'
                  className="floor-map-image"
                  dangerouslySetInnerHTML={{ __html: svgContent.map2 }}
                /> }
                
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
      )}
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
            {!(svgMapLabels.includes(largeViewMap.label)) && <SafeImage
                  src={largeViewMap.src}
                  alt={`${largeViewMap.label} for Centenary hospital`}
                  className="floor-map-image"
                />
                }

                {(svgMapLabels.includes(largeViewMap.label) && !(largeViewMap.label === "Floor 4 Margaret Birch Wing Main Map")) && <div
                  alt={`${largeViewMap.label} for Centenary hospital`}
                  id='svg-content'
                  className="floor-map-image"
                  dangerouslySetInnerHTML={{ __html: svgContent.map1 }}
                />
              }

              {((svgMapLabels.includes(largeViewMap.label)) && svgContent.map2 && largeViewMap.label === "Floor 4 Margaret Birch Wing Main Map") && 
                <div
                  alt={`${largeViewMap.label} for Centenary hospital`}
                  id='svg-content'
                  className="floor-map-image"
                  dangerouslySetInnerHTML={{ __html: svgContent.map2 }}
                /> }
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
