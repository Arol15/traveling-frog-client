import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
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
  const [showPopup, setShowPop] = useState({});

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
  console.log(pointsofinterest);

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/arol15/cke0uazub09t019ryp4uo156y"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {pointsofinterest.map((point) => (
          <>
            <Marker key={point.id} latitude={point.lat} longitude={point.lng}>
              <div
                onClick={() =>
                  setShowPop({
                    ...showPopup,
                    [point.id]: true,
                  })
                }
              >
                <img
                  className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="marker"
                />
              </div>
              {/* <svg className='marker'
            style={{
                width: "24px", 
                height: "24px"
            }}
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg> */}
            </Marker>
            {showPopup[point.id] ? (
              <Popup
                latitude={point.lat}
                longitude={point.lng}
                closeButton={true}
                closeOnClick={false}
                onClose={() => this.setState({ showPopup: false })}
                anchor="top"
              >
                <div>
                  <h3>{point.title}</h3>

                </div>
              </Popup>
            ) : null}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
