import './App.css';
import axios from "axios"
import {useState} from "react";
import getContinentColor from "./helpers/getContinentColor.js";
import worldMap from "./assets/world_map.png"

function App() {
    const [countries, setCountries] = useState([]);

    async function fetchData() {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,continents");

            result.data.sort((a, b) => a.population - b.population)
            setCountries(result.data);
            // console.log(result.data);
            // setCountryName(result.data[0].name.common)
            // console.log(result.data[0].name.common)
            // setCountryPopulation(result.data[0].population)
            // console.log(result.data[0].population)
            // setContinents(result.data[0].continents)
            // console.log(result.data[0].continents)
            // setCountryFlag(result.data[0].flags.png)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="Wereldkaart"/>
                <h1>World Regions</h1>

                {countries.length === 0 && (
                    <button onClick={fetchData}>Toon landen</button>
                )}
            </header>

            <ul className="country-list">
                {countries.map((country) => (
                        <li key={country.name.common} className="country-cards">
                            <div className="card-header">
                                <img src={country.flags.png} alt={"Vlag van " + country.name.common}/>
                            <span className={getContinentColor(country.continents[0])}>{country.name.common}</span>
                            </div>
                            <p>Has a
                            population
                            of {country.population} people</p>
                        </li>
                    )
                )
                }
            </ul>
        </>
    )
}


export default App
