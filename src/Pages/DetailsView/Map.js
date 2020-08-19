import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import './Map.css'

function Map() {
  const [viewport, setViewport] = useState({
    width: "100wh",
    height: "100vh",
    latitude: 38.500000,
    longitude: -98.000000,
    zoom: 3.8,
  });

  return (
    <div className='map-container'>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/arol15/cke0uazub09t019ryp4uo156y"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  );
}

export default Map;
