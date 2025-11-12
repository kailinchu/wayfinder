import React, { Component, useEffect } from 'react';
import './style.css';
import SearchLocationBar from './searchlocation';

const makeSVG = (site) => {
  // Access the site prop and construct the image path dynamically
  const centenaryMap = `../../../images/${site}-Maps/Centenary2.svg`; // Use capitalized site
  let selectedRooms = [];
  const roomsSelected = 2;

  if (site === "Centenary") {
    fetch(centenaryMap)
      .then(response => response.text())
      .then(svgText => {
        document.getElementById("svg-container").innerHTML = svgText;

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

        function areAdjacent(rectA, rectB) {
          const A = getCenter(rectA);
          const B = getCenter(rectB);
          const tolerance = 8.5;

          // Consider rectangles adjacent if their centers are close 
          return (
            Math.abs(A.x - B.x) <= rectA.getBBox().width + tolerance &&
            Math.abs(A.y - B.y) <= rectA.getBBox().height + tolerance
          );
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
            if (currentNode === end) break;

            for (let rect of path) {
              if (!visited.has(rect) && areAdjacent(currentNode, rect)) {
                visited.add(rect);
                parent.set(rect, currentNode); // save the parent node of each visited
                queue.push(rect);
              }
            }
          }

          let node = end;
          while (node && node !== start) {
            result.push(node);
            node = parent.get(node);
            if (node === start) result.push(start);
          }

          return result;
        }

        function makePath(room1, room2) {
          //make a function the clears the room stroke generally not just for the rooms
          room1.removeAttribute('stroke');
          room2.removeAttribute('stroke');

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
            line.setAttribute('stroke-width', '3');
            line.setAttribute('fill', 'none');
            svg.appendChild(line);
          }
        } // end of makePath

        window.makePath = makePath;//make makepath function available to component

        const Rooms = svg.querySelectorAll('path[fill="#FFFFFA"]');//select all the rooms and highlight add them to an array
        selectedRooms = [];
        console.log(selectedRooms);
        Rooms.forEach(room => {
          room.style.cursor = 'pointer';
          room.onclick = () => {
            if (selectedRooms.length < roomsSelected) {
              selectedRooms.push(room);
              room.setAttribute('stroke', 'red');
            }
            if (selectedRooms.length === roomsSelected) {
              makePath(selectedRooms[0], selectedRooms[1]);
              selectedRooms = [];
            }
          };
        });
      }).catch((error) => console.error("Error fetching SVG:", error)); // end of svg fetch
    }
} // end of makeSVG

class InteractiveMap extends Component {
  state = {
    roomIds: []
  }

  componentDidMount() {
    const { site } = this.props;
    const capitalizedSite = site.charAt(0).toUpperCase() + site.slice(1);
    makeSVG(capitalizedSite); //load the svg to the page

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
      makeSVG(capitalizedSite);
    }
  }

  handleSearchChange = (input) => {//set make path using the info from the search bars
  const svg = document.querySelector('#svg-container svg');
  if (!svg) {
    console.log("SVG not loaded yet");
    return;
  }
  //the start and end location input boxes
  const room1 = document.getElementById(input.start);
  const room2 = document.getElementById(input.end);
  
  if (window.makePath && room1 && room2) {//if the window can access the make path method and the input boxes are loaded then send the values from the boxes
    window.makePath(room1, room2);
  } else {
    console.log("failed", {windowMakePath: !!window.makePath, room1, room2});
  }
  };

  render() {
    const { site } = this.props;
    const birchmountMap = `../../../images/${site}-Maps/general.png`;
    
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
            <SearchLocationBar info={this.state.roomIds} onSearchChange={this.handleSearchChange}/>
            <div id="svg-container"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InteractiveMap;

