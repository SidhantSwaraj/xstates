import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedcountry, setSelectedCountry] = useState("");
  const [selectedstate, setSelectedState] = useState("");
  const [selectedcity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.log("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedcountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedcountry}/states`
        )
        .then((res) => {
          setStates(res.data);
          setSelectedState("");
          setSelectedCity("");
          setCities([]);
        })
        .catch((err) => console.log("Error fetching states:", err));
    }
  }, [selectedcountry]);

  useEffect(() => {
    if (selectedcountry && selectedstate) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedcountry}/state=${selectedstate}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setSelectedCity("");
        })
        .catch((err) => console.log("Error fetching cities:", err));
    }
  }, [selectedstate, selectedcountry]);

  return (
    <div className="cityselector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedcountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          value={selectedstate}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={selectedcity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedcity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedcity}</span>
          <span className="fade">
            {" "}
            {selectedstate},{selectedcountry}
          </span>
        </h2>
      )}
    </div>
  );
}
