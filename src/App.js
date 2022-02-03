import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import LineChart from "./components/LineChart";
import CircleMap from "./components/CircleMap";



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [sortedCountriesByCases, setSortedCountriesByCases] = useState([]);
  const [dataByDate, setDataByDate] = useState({});

  let [mapCenter, setMapCenter] = useState({lat: 30,lng: 70});
  const [mapZoom, setMapZoom] = useState(5);



  //Data by date for Line Graph
  useEffect(() => {
    const getDailyData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
        .then((response) => response.json())
        .then((data) => {
          setDataByDate(data);
          // console.log(dataByDate);
        });
    };
    getDailyData();
  }, []);

  //fetch global on page load
  //old api    https://covid19.mathdro.id/api
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        // console.log(data);
      });
  }, []);

  //fetch countries for select
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log("fetch countries list",data);
          // const countries = data.map((country) => ({
          //   name: country.country,
          //   value: country.countryInfo.iso3,
          //   flag: country.countryInfo.flag,
          // }));
          setCountries(data);
          const sortedData = [...data]; //Copying array
          sortedData.sort((a, b) => {
            if (a.cases < b.cases) return 1;
            else return -1;
          });
          setCountries(data);
          setSortedCountriesByCases(sortedData);
        });
    };
    getCountriesData();
  }, []);

  // useEffect(()=>{

  // },[]);

  const onChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    // console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // console.log("specific/all ",data);
        setCountryInfo(data);
        // console.log([data.countryInfo.lat,data.countryInfo.long]);
        if(url!=="https://disease.sh/v3/covid-19/all"){
          const newCenter=[data.countryInfo.lat,data.countryInfo.long];
          setMapCenter({lat : data.countryInfo.lat, lng: data.countryInfo.long});
          setMapZoom(4);
          console.log("Inside onchange  var, ",newCenter,"  global", mapCenter);
        }
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="app_header_title">COVID-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.countryInfo.iso3}>
                  {country.country}&nbsp;&nbsp; &nbsp;
                  <img src={country.countryInfo.flag} width="25" height="16" />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stat">
          <InfoBox
            title="Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          ></InfoBox>
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          ></InfoBox>
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          ></InfoBox>
        </div>

        {/* <Map center={mapCenter} zoom={mapZoom}></Map> */}
          <CircleMap center={mapCenter} zoom={mapZoom}></CircleMap>

      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countriesData={sortedCountriesByCases} />
        </CardContent>
        <CardContent>
          <h3>Last 60 Days</h3>
          <LineChart dataByDate={dataByDate} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
