import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import 'leaflet/dist/leaflet.css'
import { Renderer } from "leaflet";


function Map({center,zoom}) {
    // console.log("Inside MAP ",props.center);
    // const [cc,setCC]=useState({lat:0, lng:30});
    console.log("Indisde map",center);
    // useEffect(()=>{
    //     setCC(center);
    // },[]);
  return (
    <div className="map">
        {/* {JSON.stringify(center)} */}
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
      {/* <button onClick={click}></button> */}
    </div>
  );
}

export default Map;
