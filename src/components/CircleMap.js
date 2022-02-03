import React from "react";
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import "./CircleMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';

function CircleMap({center,zoom}) {
    console.log("inside map",center);
    //dummy
    const [viewport, setViewport] = useState({
        width: 800,
        height: 600,
        latitude: center.lat,
        longitude: center.lng,
        zoom: 4
      });
      //for rerendering
      const view={width: 800,
        height: 600,
        latitude: center.lat,
        longitude: center.lng,
        zoom: 4
    }

  return (
    <div className="map">
      <ReactMapGL
        {...view}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken="pk.eyJ1Ijoiam9udGF5eXciLCJhIjoiY2s4aXcwbnA0MGFqYjNscDZicm9haXA3cCJ9.rI3D6Y4ZETQnYukX9RCOow"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}

export default CircleMap;