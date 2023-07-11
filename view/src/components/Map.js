import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pin from './locp.svg';


function Mapp() {
  const [viewport, setViewport] = React.useState();

  const [selectedEvent, setSelectedEvent] = useState(null);

  const marks = [{
    id: 1,
    name: "OAT",
    lng: 80.22990184208273,
    lat: 26.505257661670083,
    events: [
      {
        SNo : 1,
        event: "Book Club Event",
        Details: "A Book fair followed by a treasure hunt!!!... Dont miss out on the fun."
      },
      {
        SNo : 2,
        event: "MClub Night",
        Details: "This is another acoustic night. Come join us to relax and have fun!!"
      }
    ]
  },
  {
    id: 2,
    name: "CCD",
    lng: 80.2342585835755,
    lat: 26.51197348008671,
    events: [
      {
        SNo : 1,
        event: "Book Club Event",
        Details: "A Book fair followed by a treasure hunt!!!... Dont miss out on the fun."
      },
      {
        SNo : 2,
        event: "MClub Night",
        Details: "This is another acoustic night. Come join us to relax and have fun!!"
      },
      {
        SNo : 3,
        event: "MClub Night",
        Details: "This is another acoustic night. Come join us to relax and have fun!!"
      }
    ]
  }];

  const mapper = marks.map((mark) =>
    <Marker id={mark.id} longitude={mark.lng} latitude={mark.lat}><button
      className="marker-btn"
      onClick={e => {
        setSelectedEvent(mark);
      }}
    ><img src={pin} width={25} /></button></Marker>
  );

  return (
    <div>

    <Map
      initialViewState={{
        longitude: 80.23289680480958,
        latitude: 26.511402242762095,
        zoom: 16,
        pitch: 35,
        // bearing:50,
        maxBounds: [[80.21972179412843, 26.49669310356472], [80.24988999430397, 26.53040995882184]],
        logoPosition: 'bottom-right',
        testMode: true
      }}
      mapboxAccessToken="pk.eyJ1Ijoicm9oYW5yMjEiLCJhIjoiY2xmMWMyZ2Q1MDZ6cTNzbnY4Y2FqYXFxMSJ9.Ppuy03i7T2TG4jcY8ldqpQ"
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      attributionControl={false}
    > 
    <ScaleControl/> 
      <NavigationControl position='top-left' />
      {mapper}
      {selectedEvent ? (
        <Popup
          longitude={selectedEvent.lng}
          latitude={selectedEvent.lat}
          onClose={() => setSelectedEvent(null)}
        >
          <div>
            <h1>Events at {selectedEvent.name}</h1>
            {selectedEvent.events.map(prog => (
              <div><h3>{prog.event}</h3>{prog.Details}<br></br><br></br></div>
            )
            )}
          </div>
        </Popup>
      ) : null
      }
    </Map>
    <button style={{top:"10px", right:"10px", position: "absolute"}}><a href="/navigation.html">DIRECTIONS</a></button>

    </div>
  );
}

export default Mapp;



























// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import Map from 'react-map-gl'
// // import * as parkDate from "./data/skateboard-parks.json";

// export default function App() {

//   const [viewport, setViewport] = useState({
//     latitude: 45.4211,
//     longitude: -75.6903,
//     width: "100vw",
//     height: "100vh",
//     zoom: 10
//   });
//   // const [selectedPark, setSelectedPark] = useState(null);

//   // useEffect(() => {
//   //   const listener = e => {
//   //     if (e.key === "Escape") {
//   //       setSelectedPark(null);
//   //     }
//   //   };
//   //   window.addEventListener("keydown", listener);

//   //   return () => {
//   //     window.removeEventListener("keydown", listener);
//   //   };
//   // }, []);

//   return (
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         onViewportChange={viewport => {
//           setViewport(viewport);
//         }}
//       >
//        {/* Marker */}
//       </ReactMapGL>
//   );
// }