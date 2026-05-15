import './App.css';
import axios from "axios"
import {useState} from "react";
import getRegionColor from "./helpers/getRegionColor.js";
import worldMap from "./assets/world_map.png"
import roundingNumbers from "./helpers/roundingNumbers.js";
import spinningGlobe from "./assets/spinning-globe.gif"

function App() {
    const [allCountries, setAllCountries] = useState([]);
    const [countryByName, setCountryByName] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    async function fetchAllCountries() {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,region,tld");
            result.data.sort((a, b) => a.population - b.population)
            setAllCountries(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchCountryByName() {
        try {
            const result = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            setCountryByName(result.data[0]);
            setSearchQuery("");
            setError("");
        } catch (e) {
            setError(`${searchQuery} bestaat niet. Probeer het opnieuw.`);
            setCountryByName("");
            console.error(e);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await fetchCountryByName();
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="World map"/>
                <h1>World Regions</h1>

                {allCountries.length === 0 && (
                    <button className="all-countries-button" onClick={fetchAllCountries}>Show all country info</button>
                )}
            </header>
            <main>
                <section>
                    <ul className="country-list">
                        {allCountries.map((country) => (
                                <li key={country.name.common} className="country-cards">
                                    <div className="card-header">
                                        <img src={country.flags.png} alt={"Vlag van " + country.name.common}/>
                                        <span
                                            className={getRegionColor(country.region)}>{country.name.common}</span>
                                    </div>
                                    <p>Has a population of {country.population} people</p>
                                </li>
                            )
                        )
                        }
                    </ul>
                </section>
                <section className="search-country">
                    <h1>Search country information</h1>
                    <div className="search-country-content">
                        <img src={spinningGlobe} alt="Spinning globe"/>
                        <form className="search-button" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Bijvoorbeeld Nederland of Peru"
                                name="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                            <button type="submit">ZOEK</button>
                        </form>
                    </div>
                    {countryByName && (
                        <article className="search-country-card">
                            <>
                                <div>
                                    <img src={countryByName.flags.png} alt="Vlag"/>
                                    <h2>{countryByName.name.common}</h2>
                                </div>
                                <p>{countryByName.name.common} is situated in {countryByName.subregion} and the capital
                                    is {countryByName.capital[0]}</p>
                                <p>It has a population of {roundingNumbers(countryByName.population)} million people and
                                    it
                                    borders with {countryByName.borders.length} neighboring countries</p>
                                <p>Websites can be found on {countryByName.tld} domain's</p>
                            </>
                        </article>
                    )}
                    {error && (
                        <p>{error}</p>
                    )}
                </section>
            </main>
        </>
    )
}


export default App
