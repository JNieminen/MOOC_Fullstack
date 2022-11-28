import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ changeHandler, filter }) => (
  <div>find countries <input value={filter}
    onChange={changeHandler} />
  </div>
)

const Country = ({ country, buttonHandler }) => (
  <>{country.name.common} <button onClick={buttonHandler}
    value={'^' + country.name.common + '$'}>show</button><br /></>
)

const Weather = ({ city }) => {
  // temperature, weather icon, windspeed
  // Note: Free plan on openweathermap has limit of 60 calls per minute
  const [weather, setWeather] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [url])

  //console.log(weather) what does the response look like from openweathermap

  if (weather) { // don't use the date before we have it!
    return (
      <div>
        <h3>Weather in {city}</h3>
        temperature {(parseFloat(weather.main.temp) - 273.15).toFixed(2)} Celsius<br />
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img><br />
        wind {weather.wind.speed} m/s < br />
      </div >
    )
  }

}

const CountryDetails = ({ country }) => (
  // name (h2), capital, area, languages(h4) (ul), flag
  <div>
    <h2>{country.name.common}</h2>
    capital {country.capital}<br />
    area {country.area}<br />
    <h4>languages:</h4>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt='country flag'></img>
    <Weather city={country.capital[0]} />
  </div >

)

const Countries = ({ countries, buttonHandler }) => {
  if (countries.length > 10) {
    return (<>Too many matches, specify another filter</>)
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <Country key={country.name.common}
          country={country}
          buttonHandler={buttonHandler} />)}
      </div>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        //console.log(response.data[1]) // Let's find out what an individual country data looks like
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const buttonHandler = (event) => {
    //console.log(event.target.id)
    setFilter(event.target.value)
  }

  const nameContainsFilter = (name, filter) => {
    const re = new RegExp(filter, 'i')
    return re.test(name)
    // return name.toLowerCase().includes(filter.toLowerCase())
  }

  const countriesToShow = (filter.length === 0)
    ? countries
    : countries.filter(country => nameContainsFilter(country.name.common, filter))

  return (
    <div>
      <Filter changeHandler={handleFilterChange} filter={filter} />
      <Countries countries={countriesToShow} buttonHandler={buttonHandler} />
    </div>
  )
}

export default App

