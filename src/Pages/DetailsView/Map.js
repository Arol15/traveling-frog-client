import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config";
import ReactMapGL, { Marker } from "react-map-gl";
import "./Map.css";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100wh",
    height: "100vh",
    latitude: 38.5,
    longitude: -98.0,
    zoom: 3.8,
  });

  const locations = useLocation();
  const typeid = locations.state.id;
  const [pointsofinterest, setPointsofinterest] = useState([]);

  const getPointsofinterest = async () => {
    const res = await fetch(`${config.baseUrl}/pointsofinterest/${typeid}`);
    const data = await res.json();
    //   console.log(data)
    return data;
  };
  // getPointsofinterest()
  useEffect(() => {
    (async () => {
      const data = await getPointsofinterest();
      //   console.log(data)
      setPointsofinterest(data.pointsofinterest);
    })();
  }, []);
  console.log(pointsofinterest)

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/arol15/cke0uazub09t019ryp4uo156y"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {
            pointsofinterest.map((point) => (
                <Marker key={point.id}
                    latitude={point.lat}
                    longitude={point.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <div>{point.title}</div>
                </Marker>
        ))}
        </ReactMapGL>
    </div>
  );
}

export default Map;
