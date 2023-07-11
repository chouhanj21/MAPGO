import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pin from './locp.svg';


function Magnus() {
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
  }];

  const mapper = marks.map((mark) =>
    <Marker id={mark.id} longitude={mark.lng} latitude={mark.lat}><button
      className="marker-btn"
      onClick={e => {
        setSelectedEvent(mark);
      }}
      style={{backgroundColor:"transparent", backgroundImage:"none",background:"none",border:"none", outline:"none",borderWidth:"0px", borderColor:"white"}}
    ><img src={pin} width={25} style={{backgroundColor:"transparent", backgroundImage:"none",background:"none",border:"none", borderWidth:"0px"}}/></button></Marker>
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

export default Magnus;
