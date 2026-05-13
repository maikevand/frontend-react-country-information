import './App.css';
import axios from "axios"
import {useState} from "react";
import getContinentColor from "./helpers/getContinentColor.js";

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
            <button onClick={fetchData}>Toon landen</button>

            <ul className="country-list">
            {countries.map((country) => (
                <li key={country.name.common}>
                    <img src={country.flags.png} alt={"Vlag van " + country.name.common}/>
                    <span className={getContinentColor(country.continents[0])}>{country.name.common}</span> Has a population
                    of {country.population} people
                </li>
                )
            )
            }
            </ul>
                    </>
                    )
                    }


                    export default App
