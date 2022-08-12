import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, FilterChange }) => {
  return (
    <>
    <div>find countries 
    <input
        value={filter}
        onChange={FilterChange}>
      </input>
    </div>
    </>
  )
}

const DefaultMsg = () => {
  return (
    <>
    <p>too many matches, specify another filter</p>
    </>
  )
}

const CountryList = ({ search }) => {
  return (
    <>
    {search && search.map((country) => {
      return (
        <div key={country.name.common}>
          <li>{country.name.common}</li>
        </div>
      )
    })}
    </>
  )
}

const Results = ({search}) => {
  return (
    <>
      {search && search.map((country) => {
        return (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p><b>languages:</b></p>
            {Object.hasOwn(country, 'languages') && Object.entries(country.languages).map(([key, value]) => {
            return (
                <ul key={key}>
                  <li>{value}</li>
                </ul>
            )
        })}
            <img src={country.flags.png} alt="country flag" width="180" height="180"></img>
          </div>
)
})}
    </>
  )
}

const Content = ({filterSize, query}) => {
    if (filterSize.length >= 1 && query.length <= 10 && query.length !== 1) {
    return (
      <>
      <CountryList search={query} />
      </>
    )
  }
    else if (filterSize.length >= 1 && query.length === 1) {
      return (
        <Results search={query} />
      )
    } else {
      return (
        <DefaultMsg />
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
        })
  })
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
}
  const query = countries.filter(country => country.name.common.toLowerCase().includes(filter))

  return (
    <>
    < Filter filter={filter} FilterChange={handleFilterChange}/>
    < Content filterSize={filter} query={query}/>
    </>
  );
}

export default App;

