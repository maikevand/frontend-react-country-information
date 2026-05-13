import './App.css';
import axios from "axios"
import {useState} from "react";

function App() {
const [country, setCountry] = useState(" ");
    async function fetchData () {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population");
            setCountry(result.data[0].name.common)
            console.log(result.data[0].name.common)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button onClick={fetchData}>Toont landen info</button>
            <li>{country}</li>
        </>
    )
}

export default App
