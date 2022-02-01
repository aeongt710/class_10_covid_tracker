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
import Map from "./Map";
import Table from './components/Table';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [sortedCountriesByCases,setSortedCountriesByCases]=useState([]);

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
          const sortedData=[...data]; //Copying array
          sortedData.sort((a,b)=>{
            if(a.cases<b.cases)
              return 1;
            else
            return -1;
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
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.countryInfo.iso3}>{country.country}&nbsp;&nbsp; &nbsp;<img src={country.countryInfo.flag} width="25" height="16" /></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stat">
          <InfoBox
            title="Coronavirus" total={countryInfo.cases} cases={countryInfo.todayCases}  ></InfoBox>
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}></InfoBox>
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}></InfoBox>
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countriesData={sortedCountriesByCases}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
