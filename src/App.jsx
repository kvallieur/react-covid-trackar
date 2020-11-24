import logo from "../src/assets/logo.png";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent
} from "@material-ui/core";
import "./styles/App.scss";
import { fetchCountries, fetchCovidInfo } from "./api";
import { InfoBox, Map, Table, LineChart } from "./components";
import "leaflet/dist/leaflet.css";
import CountryPicker from "./components/CountryPicker";

function App() {
  // state is something like a short term memory
  // STATE is how to write a variable in react
  
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  // USEEFFECT runs a piece of code based on a given condition. Condition is specified in the square brackets []

  // useEffect(() => {
  //  THe code inside here will run once when the component loads and not again
  // }, [])

  // useEffect(() => {
  //  THe code inside here will run once when the component loads and again when the countries variable changes
  // }, [countries])

  const getCountries = async () => {
    const response = await fetchCountries();

    // Set the data for table
    setTableData(response);
    // Set the data for Map
    setMapCountries(response);
  };

  useEffect(() => {
    getCountries();
    // load the component with worldwide
    getGlobalCovidInfo();
  }, []);

  const getGlobalCovidInfo = async () => {
    const response = await fetchCovidInfo("worldwide");
    // console.log(`getting worldwide covid info `)
    setCountryInfo(response);
    // console.log(`worldwide covid info is ${JSON.stringify(response)}`)
  };

  
  return (
    <div className="app">
      {" "}
      {/* BEM naming convention */}
      <div className="app__left">
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app__header">
          <h1 className="glow">
            COVID TRACKER <img src={logo} className="App-logo" alt="logo" />
          </h1>
          <CountryPicker></CountryPicker>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            isRed
            active={casesType === "cases"}
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          ></InfoBox>
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
        />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <div className="app__information">
              <h3> Live Cases by Country</h3>
              <Table countries={tableData}></Table>
              <h3>Worldwide new cases </h3>
              {/* Table */}
              {/* Graph */}
              <LineChart casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
