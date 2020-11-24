import React from 'react'
import numeral from 'numeral'
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet'
import '../styles/Map.scss';
import { useSelector } from 'react-redux';


const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 600,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1000,
  },
};

//draw circles on the map with tooltips
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
      <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
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
  ));



function Map({ casesType, countries }) {
  const countryCode = useSelector(state => state.countyCode);
  const countryInfo = useSelector(state => state.countryInfo);
  let center = { lat: 34.80746, lng: -40.4796 };
  let zoom = 3;
  
  if(countryInfo && countryInfo.countryInfo) {
    center = {lat: countryInfo.countryInfo.lat, lng: countryInfo.countryInfo.long};
    zoom = 4;
  }

  if(countryCode === 'worldwide') {
    console.log(`hgjg`)
    center = { lat: 34.80746, lng: -40.4796 };
    zoom = 3;
  }

  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
