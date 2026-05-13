import './App.css';
import axios from "axios"
import {useState} from "react";

function App() {
const [countryName, setCountryName] = useState("");
    const [countryPopulation, setCountryPopulation] = useState("");
    async function fetchData () {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population");
            setCountryName(result.data[0].name.common)
            console.log(result.data[0].name.common)
            setCountryPopulation(result.data[0].population)
            console.log(result.data[0].population)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button onClick={fetchData}>Toont landen info</button>
            <li>{countryName} has a population of {countryPopulation} people</li>
        </>
    )
}

export default App
