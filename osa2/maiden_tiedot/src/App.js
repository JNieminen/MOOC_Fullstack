import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ changeHandler, filter }) => (
  <div>find countries <input value={filter}
    onChange={changeHandler} />
  </div>
)

const Country = ({ country, buttonHandler }) => (
  <>{country.name.common} <button onClick={buttonHandler} id={country.name.common}>show</button><br /></>
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
    // name (h2), capital, area, languages(h4) (ul), flag
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        capital {country.capital}<br />
        area {country.area}<br />
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt='country flag'></img>
      </div >
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
    event.preventDefault()
    //console.log(event.target.id)
    setFilter(event.target.id)
  }

  const nameContainsFilter = (name, filter) => (
    name.toLowerCase().includes(filter.toLowerCase())
  )

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

