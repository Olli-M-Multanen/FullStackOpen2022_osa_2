import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = ({ handleClick, text, value}) => (
  <button onClick={handleClick} value={value}>
    {text}
  </button>
)

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

const DefaultMsg = ({ }) => {
  return (
    <>
    <p>too many matches, specify another filter</p>
    </>
  )
}

const WeatherReport = ({ data,forecast}) => {
    let imgBeginning = "http://openweathermap.org/img/wn/"
    let imgEnding = "@2x.png"

  if (!forecast) return null
  return (
    <>

    <h1>Weather in {data.capital}</h1>
    <p>tempeture X celsius</p>
    {forecast.current && forecast.current.weather.map(data => (
      <div key={data.id}>
        <img src={`${imgBeginning}${data.icon}${imgEnding}`}/>
        <p>{data.main}</p>
        <p>wind conditions</p>
      </div>
    ))}
    </>
  )
}

const Results = ({ search, setForecast, forecast}) => {
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${data.latitude}&lon=${data.longitude}&appid=603935c89639c55e3a23b970a3722267`)
      .then(response => {
        console.log('promise fulfilled')
        setForecast(response.data)
      })
  }, [])

  const data = {
    latitude : "",
    longitude : "",
    capital: ""
  }

  if (!data) return null

  return (
    <>
      {search && search.map((country) => {
        {data.longitude = country.latlng[1]}
        {data.latitude = country.latlng[0]}
        {data.capital = country.capital}
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

    <WeatherReport data={data} setForecast={setForecast} forecast={forecast}/>
    
    </>
  )

}

const ButtonSelect = ({buttonSelect, handleClick}) => {
  return (
    <>
      {buttonSelect && buttonSelect.map((country) => {
        return (
          <div key={country.name.common}>
            <Button handleClick={handleClick} text="back" value=""/>
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

const CountryList = ({ search, handleClick }) => {
  return (
    <>
    {search && search.map((country) => {
      return (
        <div key={country.name.common}>
          <li>{country.name.common}
          <Button handleClick={handleClick} text="show" value={country.name.common}/>
          </li>
        </div>
      )
    })}
    </>
  )
}

const Content = ({filterSize, query, handleClick, buttonSelect, handleGoBack, setForecast, forecast, setData, sendData}) => {

    if (filterSize.length >= 0 && query.length <= 10 && query.length !== 1 && buttonSelect.length !== 1) {
    return (
      <>
      <CountryList search={query} handleClick={handleClick}/>
      </>
    )
  } else if (buttonSelect.length === 1) {
    return (
      <>
      <ButtonSelect buttonSelect={buttonSelect} handleClick={handleGoBack}/>
      </>
    )
  }

    else if (filterSize.length >= 0 && query.length === 1) {
      return (
        <Results search={query} setForecast={setForecast} forecast={forecast} setData={setData} sendData={sendData}/>
      )
    } else {
      return (
        <DefaultMsg />
      )
    }
  }

const App = () => {

  const [countries, setCountries] = useState([])
  const [forecast, setForecast] = useState([])
  const [data, setData] = useState({
    latitude: null,
    longitude: null,
    capital: null
  })
  const [buttonSelect, SetButtonSelect] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
}
  const handleClick = (event) => {
    console.log(event.target.value)
    SetButtonSelect(countries.filter(country => country.name.common == event.target.value))
}
  const handleGoBack = () => {
    SetButtonSelect("")
  }
  const sendData =(data) => {
    setData(data)
  }

  const query = countries.filter(country => country.name.common.toLowerCase().includes(filter))

  return (
    <>
    < Filter filter={filter} FilterChange={handleFilterChange}/>
    < Content filterSize={filter} 
              query={query}
              handleClick={handleClick}
              buttonSelect={buttonSelect}
              handleGoBack={handleGoBack}
              setForecast={setForecast}
              forecast={forecast}
              sendData={sendData} 
              setData={setData}/>
    </>
  );
}

export default App;

