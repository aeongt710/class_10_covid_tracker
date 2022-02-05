import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import LineChart from "./components/LineChart";
import CircleMap from "./components/CircleMap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [sortedCountriesByCases, setSortedCountriesByCases] = useState([]);
  const [dataByDate, setDataByDate] = useState({});

  let [mapCenter, setMapCenter] = useState({ lat: 30, lng: 70 });
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

  const onChange = async (value) => {
    const countryCode = value.countryInfo.iso3;
    setCountry(countryCode);
    console.log("onchange",value)
    const url =
      countryCode === "Global"
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
        if (url !== "https://disease.sh/v3/covid-19/all") {
          const newCenter = [data.countryInfo.lat, data.countryInfo.long];
          setMapCenter({
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          });
          setMapZoom(4);
          console.log(
            "Inside onchange  var, ",
            newCenter,
            "  global",
            mapCenter
          );
        }
      });
  };
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="app_header_title">COVID-19 Tracker</h1>
          <FormControl className="app_dropdown">
            {/* <Select variant="outlined" value={country} onChange={onChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.countryInfo.iso3}>
                  {country.country}&nbsp;&nbsp; &nbsp;
                  <img src={country.countryInfo.flag} width="25" height="16" />
                </MenuItem>
              ))}
            </Select> */}
            <Autocomplete
             id="asynchronous-demo"
              sx={{ width: 300 }}
              // value={countr)}
              
              options={[...[{country:"Global",countryInfo:{flag:"",iso3:"Global"},iso3:"Global" }],...countries]}
              autoHighlight
              // onChange={(event,newValue)=>{

              // }}
              onChange={(event, value) => {
                console.log(value)
                onChange(value);
              }}
              getOptionLabel={(option) => option.country}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  value={option?.countryInfo?.iso3}
                >
                  
                  <img
                    loading="lazy"
                    width="20"
                    src={option?.countryInfo?.flag}
                    srcSet={option?.countryInfo?.flag}
                    alt=""
                  />
                  {option?.country}
                  {/* ({option.code}) +{option.phone} */}
                </Box>
              )}
              
              
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
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
        <CircleMap
          center={mapCenter}
          zoom={mapZoom}
          list={sortedCountriesByCases}
        ></CircleMap>
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
