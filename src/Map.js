import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  console.log("center of ..............",center,zoom);  
  
  const [map,setmap]=useState(null);
  if(map)
    {
      map.flyTo(center);
     }

  return (
      <div className="map">
        <MapContainer center = { center } zoom={ zoom } whenCreated={setmap} maxZoom={8} >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(countries, casesType)};
        </MapContainer>
      </div>
    );
  }

export default Map;