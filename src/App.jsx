import './App.css';
import axios from "axios"
import {useState} from "react";
import getContinentColor from "./helpers/getContinentColor.js";
import worldMap from "./assets/world_map.png"

function App() {
    const [allCountries, setAllCountries] = useState([]);
    const [countryByName, setCountryByName] = useState("");

    async function fetchAllCountries() {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,continents");
            console.log(result.data[1].capital);
            result.data.sort((a, b) => a.population - b.population)
            setAllCountries(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchCountryByName() {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/name/netherlands");
            console.log(result.data[1].name.common);
            console.log(result.data[1].capital[0]);
            console.log(result.data);
            setCountryByName(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="World map"/>
                <h1>World Regions</h1>

                {allCountries.length === 0 && (
                    <div>
                        <button onClick={fetchAllCountries}>Show all country info</button>
                        <button onClick={fetchCountryByName}>Search country</button>
                    </div>
                )}
            </header>

            <ul className="country-list">
                {allCountries.map((allCountries) => (
                        <li key={country.name.common} className="country-cards">
                            <div className="card-header">
                                <img src={country.flags.png} alt={"Vlag van " + country.name.common}/>
                                <span className={getContinentColor(allCountries.continents[0])}>{country.name.common}</span>
                            </div>
                            <p>Has a
                                population
                                of {allCountries.population} people</p>
                        </li>
                    )
                )
                }
            </ul>
        </>
    )
}


export default App
