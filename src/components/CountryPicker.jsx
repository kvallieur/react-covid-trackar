import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { fetchCountries, fetchCovidInfo } from "../api";
import { useDispatch } from "react-redux";
import { changeCountryCode, changeCountryInfo } from "../redux/actions/actions";
import "../styles/App.scss";

function CountryPicker() {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  const getCountriesByName = async () => {
    const response = await fetchCountries();
    setCountries(
      response.map((c) => ({ name: c.country, value: c.countryInfo.iso2 }))
    );
  };

  useEffect(() => {
    getCountriesByName();
  }, []);

//   const onCountryChange = (event) => {
//     const countryCode = event.target.value;
//     dispatch(changeCountry(countryCode));
//     setCountry(countryCode);
//   };

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    dispatch(changeCountryCode(countryCode));
    setCountry(countryCode);

    await fetchCovidInfo(countryCode).then((response) => {
      // console.log(`getting covid info for ${countryCode}`)
      dispatch(changeCountryInfo(response));
      // console.log(` countryInfo is ${JSON.stringify(response.countryInfo)}`);
    //   if (countryCode !== "worldwide") {
    //     setMapCenter({
    //       lat: response.countryInfo.lat,
    //       lng: response.countryInfo.long,
    //     });
    //     setMapZoom(4);
    //   } else {
    //     setMapCenter({ lat: 34.80746, lng: -40.4796 });
    //     setMapZoom(3);
    //   }
    });
  };

  return (
    <div>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>

          {countries.map((cntry, index) => (
            <MenuItem key={index} value={cntry.value}>
              {cntry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CountryPicker;
