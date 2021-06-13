import React, { useState, useEffect } from "react"
import Output from "./Output"

const App = (props) => {
  const [currentForecast, setCurrentForecast] = useState({
    main: {},
    weather: [{}],
    wind: {},
  })
  const [pastSearches, setPastSearches] = useState(null)

  const fetchWeather = async (zip) => {
    try {
      const response = await fetch(`api/v1/forecast?zip=${zip}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const weatherForecast = await response.json()
      setCurrentForecast(weatherForecast)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const fetchPastSearches = async () => {
    try {
      const response = await fetch("/past_searches")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      let searches = await response.json()
      // takes long string returned and removes new line marks
      searches = searches.replaceAll("\n", "")
      // breaks string into array of 5 letter chunks
      searches = searches.match(/.{5}/g)
      setPastSearches(searches)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const postSearch = async (zip) => {
    try {
      const response = await fetch("/past_searches/new", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zip }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      // const postedZip = (await response.json()).toString()
      // let currentList = pastSearches
      // currentList.push(postedZip)
      // setPastSearches(currentList)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchWeather("02109")
    fetchPastSearches()
  }, [])

  const onSubmission = (zip) => {
    fetchWeather(zip)
    postSearch(zip)
  }

  if (currentForecast.message !== "city not found") {
    const convertKToF = (temp) => {
      return (temp - 273.15) * (9 / 5) + 31
    }

    let actualTemp = convertKToF(currentForecast.main.temp).toFixed(2)
    let feelsLike = convertKToF(currentForecast.main.feels_like).toFixed(2)

    return (
      <div>
        <Output
          onSubmission={onSubmission}
          pastSearches={pastSearches}
          fetchWeather={fetchWeather}
        />
        <h2>{currentForecast.name} Weather</h2>
        <p>Temperature: {actualTemp} degrees Farenheit</p>
        <p>Feels Like: {feelsLike} degrees Farenheit</p>
        <p>Sky: {currentForecast.weather[0].description}</p>
        <p>Humidity: {currentForecast.main.humidity}%</p>
        <p>Wind Speed: {currentForecast.wind.speed} mph</p>
      </div>
    )
  } else {
    return (
      <div>
        <Output
          onSubmission={onSubmission}
          pastSearches={pastSearches}
          fetchWeather={fetchWeather}
        />
        <h2>We're sorry, we couldn't find anything!</h2>
        <p>
          Make sure the zip code is comprised of 5 digits, and is a valid
          location in the United States.
        </p>
      </div>
    )
  }
}

export default App
