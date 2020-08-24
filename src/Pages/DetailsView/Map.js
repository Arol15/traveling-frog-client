import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LogForm from "./LogForm";
import "./Map.css";
// import Rating from './Rating'
import { FaStar } from "react-icons/fa";

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
  // const [visited, setVisited] = useState([])
  const [showPopup, setShowPop] = useState({});

  const getPointsofinterest = async () => {
    // const allpoints = await fetch(`${config.baseUrl}/pointsofinterest/${typeid}`);
    // const allpointsdata = await allpoints.json();
    const email = JSON.parse(localStorage.getItem("data")).user.email;
    // console.log(email)
    // const res = await fetch(`${config.baseUrl}/users/visits/${email}/${typeid}`);
    const res = await fetch(
      `${config.baseUrl}/pointsofinterest/${typeid}/${email}`
    );
    const data = await res.json();
    // console.log(data.pointsofinterest)
    // return [data, allpointsdata];
    return data;
  };
  // getPointsofinterest()
  useEffect(() => {
    (async () => {
      const data = await getPointsofinterest();
      //   console.log(data)
      //   setPointsofinterest(data.pointsofinterest);
      // setVisited(data[0].visits);
      // console.log(data[1])
      // setPointsofinterest(data[1].pointsofinterest)
      setPointsofinterest(data.pointsofinterest);
    })();
  }, []);
  // console.log(visited);
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
                    [point.id]: true,
                  })
                }
              >
                {/* <img
                  className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="marker"
                /> */}
                {point.visited ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="green"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-map-pin"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    // class="feather feather-map-pin"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                )}
              </div>
            </Marker>
            {(point.visited && showPopup[point.id] ? (
              <Popup
                latitude={point.lat}
                longitude={point.lng}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPop({})}
                anchor="top"
              >
                <div>
                  <h3>{point.title}</h3>
                  <div>
                    <img src={point.images} alt="pic" />
                  </div>
                  <div>
                    Visited on:{" "}
                    {new Date(point.start_date_visited).toLocaleDateString()}
                  </div>
                  <div>
                    <p>
                      Rating:{" "}
                      {[...Array(point.rating)].map((star, i) => (
                        <FaStar
                          key={i}
                          selected={point.rating}
                          color="#ffc107"
                        />
                      ))}<span>({point.rating} of 5 stars)</span>
                    </p>
                  </div>
                </div>
              </Popup>
            ) : null) ||
              (!point.visited && showPopup[point.id] ? (
                <Popup
                  latitude={point.lat}
                  longitude={point.lng}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPop({})}
                  anchor="top"
                >
                  <div>
                    <h3>{point.title}</h3>
                    <LogForm
                      getPointsofinterest={getPointsofinterest}
                      setPointsofinterest={setPointsofinterest}
                      setShowPop={setShowPop}
                      point={point.id}
                    />
                  </div>
                </Popup>
              ) : null)}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
