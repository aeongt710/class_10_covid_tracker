import React from "react";
import ReactMapGL from "react-map-gl";
import "./CircleMap.css";
// import "mapbox-gl/dist/mapbox-gl.css";
import './mapOr.css';
import {
  ScaleControl,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Layer
} from "react-map-gl";
import uuid from "react-uuid";
import { useRef, useEffect, useState } from "react";
import { Card, makeStyles } from "@mui/material";
// import mapboxgl from '!mapbox-gl';
// import mapboxgl from '!mapbox-gl';
function CircleMap({ center, zoom, list }) {
  const [viewport, setViewport] = React.useState({
    longitude: center.lng,
    latitude: center.lat,
    bearing: 0,
    pitch: 0,
    zoom: zoom,
  });
  useEffect(() => {
    console.log("rerendered");setViewport({
      longitude: center.lng,
      latitude: center.lat,
      bearing: 0,
      pitch: 0,
      zoom: zoom,
    });
  }, [center]);
  //dummy
  //   const [viewport, setViewport] = useState({
  //     width: 800,
  //     height: 600,
  //     latitude: 30,
  //     longitude: 70,
  //     zoom: 4,
  //   });
  //   const geolocateStyle = {
  //     top: 0,
  //     left: 0,
  //     padding: "10px",
  //   };

  //   const fullscreenControlStyle = {
  //     top: 36,
  //     left: 0,
  //     padding: "10px",
  //   };

    const navStyle = {
      top: 72,
      left: 0,
      padding: "10px",
      backgroundColor: "green",
    };

  //   const scaleControlStyle = {
  //     bottom: 36,
  //     left: 0,
  //     padding: "10px",
  //   };

  const [selectedCountry, setSelectedCountry] = useState(null);
  //   console.log(list);

  const [showPopup, togglePopup] = React.useState(false);
  return (
    <Card className="asd">
      <div className="map">
        <ReactMapGL
        
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          onClick={(e) => {
            togglePopup(false);
          }}
          mapboxApiAccessToken="pk.eyJ1Ijoiam9udGF5eXciLCJhIjoiY2s4aXcwbnA0MGFqYjNscDZicm9haXA3cCJ9.rI3D6Y4ZETQnYukX9RCOow"
          width={"100%"}
          height={"100%"}
          className="test"
          // mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {list.map((country) => (
            <Marker
              longitude={country.countryInfo.long}
              latitude={country.countryInfo.lat}
            >
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCountry(country);

                  togglePopup(!showPopup);
                }}
              >
                <div>
                  <img src={country.countryInfo.flag} width="40" height="25" />
                </div>
              </button>
            </Marker>
          ))}
          {showPopup && (
            <Popup
              longitude={selectedCountry.countryInfo.long}
              latitude={selectedCountry.countryInfo.lat}
              closeButton={true}
              closeOnClick={false}
              onClose={() => togglePopup(false)}
              anchor="top-right"
            >
              <div>
                {console.log(selectedCountry)}
                <strong>{selectedCountry.countryInfo.iso3}</strong>
                <br />
                Cases: <strong>{selectedCountry.cases}</strong>
                <br />
                Deaths: <strong>{selectedCountry.deaths}</strong>
                <br />
                Recovered: <strong>{selectedCountry.recovered}</strong>
                <br />
                Continent: <strong>{selectedCountry.continent}</strong>
                <br />
                Location:{" "}
                <strong>
                  [{selectedCountry.countryInfo.lat},
                  {selectedCountry.countryInfo.long}]
                </strong>
              </div>
            </Popup>
          )}
          {/* <GeolocateControl  /> */}
        {/* <FullscreenControl/> */}
        {/* <NavigationControl  /> */}
        {/* <ScaleControl  /> */}
        </ReactMapGL>
      </div>
    </Card>
  );
}

export default CircleMap;
