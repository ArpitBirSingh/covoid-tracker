import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    multiplier: 800,
    option: { color:"#ff6c47", fillColor: "#ff6c47" }
  },
  recovered: {
    multiplier: 1200,
    option: { color:"#00FF00", fillColor: "#7DFF86" },
  },
  deaths: {
    multiplier: 2000,
    option: { color:"#cc1034", fillColor: "#cc1034" }
  },
};

export const sortData = (data) =>
          {
              const sortedData=[...data];
              sortedData.sort((a,b)=>
                                  {
                                      if(a.cases>b.cases)    return -1;
                                      else                   return 1;
                                  }
                             );
                return sortedData;
          };

export const prettyPrintStat = (stat) =>
          stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = ( data, casesType ) =>
             data.map( (country)=>
                        (
                                  <Circle
                                  center={[country.countryInfo.lat, country.countryInfo.long]}
                                  fillOpacity={0.2}
                                  pathOptions={casesTypeColors[casesType].option}
                                  radius={
                                    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                                  }
                                >
                                <Popup>
                                <div className="info-container">
                                    <div
                                      className="info-flag"
                                      style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                                    <div className="info-name">{country.country}</div>
                                    <div className="info-confirmed">
                                      Cases: {numeral(country.cases).format("0,0")}
                                    </div>
                                    <div className="info-recovered">
                                      Recovered: {numeral(country.recovered).format("0,0")}
                                    </div>
                                    <div className="info-deaths">
                                      Deaths: {numeral(country.deaths).format("0,0")}
                                    </div>
                                  </div>
                                </Popup>
                               </Circle>                  
                        )
                      );