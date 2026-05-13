import './App.css';
import axios from "axios"
import {useState} from "react";
import getContinentColor from "./helpers/getContinentColor.js";

function App() {
const [countryName, setCountryName] = useState("");
    const [countryPopulation, setCountryPopulation] = useState("");
    const [continents, setContinents] = useState("");
    const [countryFlag, setCountryFlag] = useState("");

    async function fetchData () {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,continents");
            console.log(result.data);
            setCountryName(result.data[0].name.common)
            console.log(result.data[0].name.common)
            setCountryPopulation(result.data[0].population)
            console.log(result.data[0].population)
            setContinents(result.data[0].continents)
            console.log(result.data[0].continents)
            setCountryFlag(result.data[0].flags.png)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button onClick={fetchData}>Toont landen info</button>
            <li>
                <img src={countryFlag} alt={"Vlag van " + countryName} />
                <span className={getContinentColor(continents[0])}>{countryName}</span> Has a population of {countryPopulation} people</li>
        </>
    )
}

export default App
