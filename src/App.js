import { MenuItem,FormControl,Select, Card ,CardContent} from '@material-ui/core';
import React, { useState , useEffect} from 'react';
import InfoBox from "./InfoBox";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData, prettyPrintStat} from "./util";
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);      // only countries name and its shorthands in array
  const [country, setCountry] = useState('worldwide'); // to keep track which country code was selected
  const [countryInfo, setCountryInfo] = useState({});  //all data of country
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  
  useEffect(  ()=>
                {
                  fetch("https://disease.sh/v3/covid-19/all")
                  .then(  (response)=>response.json()  )
                  .then(   (data) => 
                              {
                                 setCountryInfo(data);
                              } ) ;
                },[]
);

  useEffect( () => {
    const getCountriesData=async () => 
    {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then
        ( 
          (response)  =>  response.json()
        )
       .then
        (
           (data)=>
            {
              const countries=data.map( (country) => 
                                         ( {
                                             name: country.country,
                                             value: country.countryInfo.iso2
                                          }  )
                                      );
               let sortedData = sortData(data);
               setCountries(countries);
               setMapCountries(data);
               setTableData(sortedData);
            }
         ) ;
    };
       getCountriesData();
  }, [] );

  const onCountryChange = async (event) =>
               {
                   const countryCode = event.target.value;
                   console.log(countryCode);
                   const url = countryCode === "worldwide"
                    ? "https://disease.sh/v3/covid-19/all"
                    : `https://disease.sh/v3/covid-19/countries/ ${ countryCode }`;
                  await fetch(url)
                   .then( (response) => response.json() )
                   .then(  (data)=>
                              {
                                setCountry(countryCode); 
                                setCountryInfo(data);  //all the data in the form of object
                                console.log("lat and long ===========",data.countryInfo.lat,data.countryInfo.long);
                                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                                setMapZoom(4);
                              } 
                        );   
               };

console.log("ha ha ha aha aha ha >>>>>>> ", countryInfo);

  return (

    <div className="app">
      <div className="app__left">
                            {/*  Title + Select input dropdown field */}
      <div className="app__header">

      <h1>COVOID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
           {
             countries.map(country => 
              (<MenuItem value={country.value}>{country.name}</MenuItem>)
                          )
           }

        </Select>
      </FormControl>

       </div>
                              {/*   InfoBox   */}
       <div className="app__stats">

           <InfoBox 
           isRed
           active={casesType === "cases"}
           onclick={ (e) => setCasesType("cases") }
           title="Coronavirus Cases" 
           cases={prettyPrintStat(countryInfo.todayCases)} 
           total={prettyPrintStat(countryInfo.cases)} />
           
           <InfoBox 
           active={casesType === "recovered"}
           onclick={ (e) => setCasesType("recovered") }
           title="Recovered" 
           cases={prettyPrintStat(countryInfo.todayRecovered)} 
           total={prettyPrintStat(countryInfo.recovered)} />

           <InfoBox 
           isRed
           active={casesType === "deaths"}
           onclick={ (e) => setCasesType("deaths") }
           title="Deaths" 
           cases={prettyPrintStat(countryInfo.todayDeaths)} 
           total={prettyPrintStat(countryInfo.deaths)} />

       </div>
                                    {/*  Map */}
       <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className="app__right">
                    
            <CardContent>  
              <h3>Live Cases by Country</h3>
                                    {/*  Table  */}
              <Table countries={tableData} />

              <h3 className="app__graphTitle">Worldwide {casesType} </h3>
                                    {/*  Graph  */}
              <LineGraph className="app__graph" casesType={casesType} />
            </CardContent>
                   
      </Card>
      
    </div>
  );
}

export default App;
