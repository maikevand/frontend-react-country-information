import './App.css';
import axios from "axios"
import {useState} from "react";
import getContinentColor from "./helpers/getContinentColor.js";
import worldMap from "./assets/world_map.png"
import roundingNumbers from "./helpers/roundingNumbers.js";

function App() {
    const [allCountries, setAllCountries] = useState([]);
    const [countryByName, setCountryByName] = useState(null);

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
            console.log(result.data[1]);
            console.log(result.data[1]);
            console.log(roundingNumbers(result.data[1].population));
            setCountryByName(result.data[1]);
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
                {allCountries.map((country) => (
                        <li key={country.name.common} className="country-cards">
                            <div className="card-header">
                                <img src={country.flags.png} alt={"Vlag van " + country.name.common}/>
                                <span className={getContinentColor(country.continents[0])}>{country.name.common}</span>
                            </div>
                            <p>Has a population of {country.population} people</p>
                        </li>
                    )
                )
                }
            </ul>
            <li>
                {countryByName && (
                    <>
                        <div>
                            <img src={countryByName.flags.png} alt="Vlag"/>
                            <h2>{countryByName.name.common}</h2>
                        </div>
                        <p>{countryByName.name.common} is situated in {countryByName.subregion} and the capital
                            is {countryByName.capital[0]}</p>
                        <p>It has a population of {roundingNumbers(countryByName.population)} million people and it borders with {countryByName.borders.length} neighboring countries</p>
                    </>
                )}
            </li>
        </>
    )
}


export default App
