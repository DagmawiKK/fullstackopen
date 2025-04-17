import { useEffect, useState } from 'react'
import axios from "axios"

const Country = ({ country, weather }) => {
  if (!country) {
    return null;
  }

  console.log("weather", weather);
  console.log("country", country);

  const langs = [];
  for (let lang in country.languages) {
    langs.push(country.languages[lang]);
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h1>Languages</h1>
      <ul>
        {langs.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div>{country.flag}</div>

      {weather?.current ? (
        <div>
          <p>Temperature: {weather.current.temp_c} °C</p>
          <p>
            Condition: {weather.current.condition.text}{" "}
            {weather.current.condition.icon && (
              <img
                src={`https:${weather.current.condition.icon}`}
                alt={weather.current.condition.text}
              />
            )}
          </p>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}
    </>
  );
};


const App = () => {

  const [value, setValue] = useState(null)
  const [result, setResult] = useState(null)
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [show, setShow] = useState([])
  const [weather, setWeather] = useState({})

  useEffect(() => {
    if (!value){
      setCountry(null)
      setCountries([])
      setResult(null)
      return
    }
    let ignore = false

    if (!ignore) {
      console.log("loading")
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
          .then(response => {
            const filtered = response.data.filter(c => c.name.common.toLowerCase().includes(value))
            console.log(filtered)
            if (filtered.length > 10) {
              setResult("Too many results pls be more specific")
              setCountry(null)
              setCountries([])
              setWeather({})

            }
            else if (filtered.length != 1) {
              setCountries(filtered)
              setShow(filtered)
              setResult(null)
              setCountry(null)
              setWeather({})

            }
            else {
              setCountry(filtered[0])
              setCountries([])
              setResult(null)
            }

            console.log("done")
            
          })
    }

    return () => {
      ignore = true
    }
  }, [value])

  useEffect(() => {
    if (country) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=eb96d5e6118944c9896131142250904&q=${country.capital[0]}&aqi=no`
        )
        .then((response) => {
          console.log('response', response.data);
          setWeather(response.data);
        });
    }
  }, [country]);

  const onSearch = (e) => setValue(e.target.value)
  const handleShow = (c) => {
    if (show.includes(c.name.common)) {
      setShow(show.filter(name => name !== c.name.common)) 
    } else {
      setShow([...show, c.name.common])
    }
  }

  return (
    <>
      <label htmlFor="search" value={value}>find coutries </label>
      <input onChange={onSearch} type="text" name="search" id="search" />
      <div>
        {result && <p>{result}</p>}
          {countries.length > 0 && !country && (
            <ul>
              {countries.map((c, index) => (
                <li key={index}>{c.name.common}<button onClick={() => handleShow(c)}>
                {show.includes(c.name.common) ? 'Hide' : 'Show'}
                </button>
              {show.includes(c.name.common) && <div><Country country={c} weather={weather}/></div>}
                </li>
              ))}
            </ul>
          )}
          {country && <Country country={country} weather = {weather}/>}
      </div>
    </>
  )
}

export default App
