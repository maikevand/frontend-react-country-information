import './App.css';
import axios from "axios"

function App() {

    async function fetchData () {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population");
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button onClick={fetchData}>Toont landen info</button>
            <p>hier komt het resultaat</p>
        </>
    )
}

export default App
