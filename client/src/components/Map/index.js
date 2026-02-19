import React, { Component, useRef } from 'react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { FaMaximize } from 'react-icons/fa6';
import './style.css';
import SearchLocationBar from './searchlocation';


const MakeSVG = (site, onRoomSelect) => {
  // Access the site prop and construct the image path dynamically
  const centenaryMap = `../../../images/${site}-Maps/Centenary_Maps_2025_FINAL2.svg`; // Use capitalized site
  let selectedRooms = [];

  if (site === "Centenary") {
    fetch(centenaryMap)
      .then(response => response.text())
      .then(svgText => {
        document.getElementById("svg-content").innerHTML = svgText;

        const svg = document.querySelector('#svg-container svg'); // control elements of the svg
        svg.style.setProperty('width', '100%');

        // get all rectangles
        const path = Array.from(svg.querySelectorAll('path[fill="#949090"]'));
        path.forEach(rects => {
          rects.setAttribute('opacity', 0); // set opacity of the rectangles to 0
        });

        // get the door dots
        const doorDot = Array.from(svg.querySelectorAll('path[fill="#5A6464"]'));

        function getCenter(rect) {
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

        function findClosestRect(room, rects) {
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

        function bfs(start, end, path) {
          let queue = [];
          let result = [];
          let visited = new Set([start]);
          let parent = new Map();

          queue.push(start);

          while (queue.length > 0) {
            let currentNode = queue.shift();
            if (currentNode === end) break;//stop once the current node is the end rect
            
            for (let rect of path) {
              if (!visited.has(rect) && isOverLapping(currentNode, rect)) {
               //console.log(rect);
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

        function makePath(room1, room2) {//to fix corner jumping add midpoints to smooth out the line
          //make a function the clears the room stroke generally not just for the rooms
          room1.removeAttribute('stroke');
          room2.removeAttribute('stroke');
          //console.log(selectedRooms);
          selectedRooms = [];

          // find closest dot to start and end room
          const closestStartDot = findClosestRect(room1, doorDot);
          const closestEndDot = findClosestRect(room2, doorDot);


          // find closest rect to the dots
          const startRect = findClosestRect(closestStartDot, path);
          const endRect = findClosestRect(closestEndDot, path);


          //run bfs between the rectangles and save the result path
          const resultpath = bfs(startRect, endRect, path);
        
          const points = resultpath.map(getCenter).map(c => `${c.x},${c.y}`).join(' ');

          const oldLine = svg.querySelector('#room-connector');//find old line and remove it
          if (oldLine) oldLine.remove();

          if (points) {//if a path is returned then create a line using the coordinates
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            line.setAttribute('id', 'room-connector');
            line.setAttribute('points', points);
            line.setAttribute('stroke', 'blue');
            line.setAttribute('stroke-width', '5');
            line.setAttribute('fill', 'none');
            svg.appendChild(line);
              
            try{//fix this, clicking the rooms makes it weird
              if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                document.activeElement.blur();
              }

              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  const len = line.getTotalLength();
                  const mid = line.getPointAtLength(len / 2);

                  const pt = svg.createSVGPoint();
                  pt.x = mid.x; 
                  pt.y = mid.y;
                  const screenPt = pt.matrixTransform(svg.getScreenCTM());

                  const targetLeft = (screenPt.x + window.scrollX) - window.innerWidth / 2;
                  const targetTop  = (screenPt.y + window.scrollY) - window.innerHeight / 2;

                  window.scrollTo({ left: Math.max(0, targetLeft), top: Math.max(0, targetTop), behavior: 'smooth' });

                  setTimeout(() => {
                    const after = window.scrollY;
                    if (Math.abs(after - targetTop) > 10) {
                      window.scrollTo({ left: Math.max(0, targetLeft), top: Math.max(0, targetTop), behavior: 'smooth' });
                    }
                  }, 100);
                });
              });

            } catch (err) {
              console.log("centering failed", err)
            }
          }
        } // end of makePath

        window.makePath = makePath;//make makepath function available to component

        const Rooms = svg.querySelectorAll('path[fill="#FFFFFA"]');//select all the rooms and highlight add them to an array

        Rooms.forEach(room => {
          room.style.cursor = 'pointer';
          room.onclick = () => {
            if (selectedRooms.includes(room)) return;
            
            selectedRooms.push(room);
            room.setAttribute('stroke', 'red');

            if (selectedRooms.length === 1){
              onRoomSelect({ start: room.id });
            }
            if (selectedRooms.length === 2) {

              onRoomSelect({ end: room.id });
              makePath(selectedRooms[0], selectedRooms[1]);
              selectedRooms = [];

            }
          };
        });
      }).catch((error) => console.error("Error fetching SVG:", error)); // end of svg fetch
    }
} // end of MakeSVG

class InteractiveMap extends Component {
  state = {
    roomIds: [],
    start: "",
    end:"",
    isFullscreen: false
  }

  mapRef = React.createRef();

  onRoomSelect = (update) => {
    this.setState(prev => ({
      ...prev,
      ...update
    }))
  }

  toggleFullscreen = () => {
    const el = this.mapRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen();
      this.setState({ isFullscreen: true });
    } else {
      document.exitFullscreen();
      this.setState({ isFullscreen: false });
    }
  };

  componentDidMount() {
    const { site } = this.props;
    const capitalizedSite = site.charAt(0).toUpperCase() + site.slice(1);
    MakeSVG(capitalizedSite, this.onRoomSelect); //load the svg to the page

    document.addEventListener("fullscreenchange", () => {
      this.setState({ isFullscreen: !!document.fullscreenElement });
    });
    
    const observer = new MutationObserver(() => {
    const whiteRooms = document.querySelectorAll('path[fill="#FFFFFA"]');
    if (whiteRooms.length > 0) {//wait for the rooms to be loaded in before getting the room ids
      const roomIds = Array.from(whiteRooms).map(el => el.id);
      this.setState({ roomIds });
      observer.disconnect(); // stop watching
    }
  });

  const target = document.getElementById("svg-container");
  if (target) {
    //waits for path elements to be added before sending them to the searchbar
    observer.observe(target, { childList: true, subtree: true });
  }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.site !== this.props.site) {
      const capitalizedSite = this.props.site.charAt(0).toUpperCase() + this.props.site.slice(1);
      MakeSVG(capitalizedSite, this.onRoomSelect);
    }
  }

  handleSearchChange = (input) => {//set make path using the info from the search bars
  const svg = document.querySelector('#svg-container svg');
  const whiteRooms = document.querySelectorAll('path[fill="#FFFFFA"]');
  if (!svg) {
    console.log("SVG not loaded yet");
    return;
  }
  //the start and end location input boxes
  const room1 = document.getElementById(input.start);
  const room2 = document.getElementById(input.end);

  if (window.makePath && room1 && room2) {//if the window can access the make path method and the input boxes are loaded then send the values from the boxes
    window.makePath(room1, room2);
    whiteRooms.forEach(rooms => {
      rooms.removeAttribute('stroke');
    });
  } else {
    console.log("failed", {windowMakePath: !!window.makePath, room1, room2});
  }
  };

  render() {
    const { site } = this.props;
    const birchmountMap = `../../../images/${site}-Maps/general.png`;
    const flippedCompass = `../../../images/${site}-Maps/flipped_compass.png`;
    
    return (
      <div>
        <div className="title-container">
          <h1 className="title">Map</h1>
        </div>

        <div id="main-content">
          {site === "birchmount" && (
            <div>
              <img alt={`${site} Map`} src={birchmountMap} id="birchmount-map"/>
            </div>
          )}
          
          {site === "centenary" && (
            <div id='centenary-map'>
                <div id="compass-container">
                  <img src={flippedCompass} id="compass"></img>
                </div>

                <SearchLocationBar 
                    info={this.state.roomIds} 
                    onSearchChange={this.handleSearchChange} 
                    startLocation={this.state.start} 
                    endLocation={this.state.end} 
                />

                <div id="Full-screen-button-container">
                  <button id="Full-screen-button" onClick={this.toggleFullscreen} title="Maximize Map"><FaMaximize/></button>
                </div>

                <div id="svg-container" ref={this.mapRef}>

                <div id="svg-content">
                  {this.state.isFullscreen && (
                    <button
                      id="exit-fullscreen-button"
                      onClick={this.toggleFullscreen}
                      title="Exit Fullscreen"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InteractiveMap;

