import React, { useState, useEffect } from "react"
import Form from "./Form"

const App = (props) => {
  const [currentForecast, setCurrentForecast] = useState({
    main: {},
    weather: [{}],
    wind: {},
  })
  // const [pastSearches, setPastSearches] = useState([])

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

  // const postSearch = async (payload) => {
  //   try {
  //     const response = await fetch("/past_searches/new", {
  //       credentials: "same-origin",
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`
  //       throw new Error(errorMessage)
  //     }
  //     // const postedZip = await response.json()
  //     // setBoardStates(boardStates.concat([postedZip["board_save"]]))
  //   } catch (error) {
  //     console.error(`Error in Fetch: ${error.message}`)
  //   }
  // }

  useEffect(() => {
    fetchWeather("02109")
    // fetchPastSearches()
  }, [])

  const onSubmission = (zip) => {
    fetchWeather(zip)
    // postSearch(zip)
  }

  if (currentForecast.message !== "city not found") {
    const convertKToF = (temp) => {
      return (temp - 273.15) * (9 / 5) + 31
    }

    let actualTemp = convertKToF(currentForecast.main.temp).toFixed(2)
    let feelsLike = convertKToF(currentForecast.main.feels_like).toFixed(2)

    return (
      <div>
        <h1>Welcome to the USA weather map machine!</h1>
        <Form onSubmission={onSubmission} />
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
        <h1>Welcome to the USA weather map machine!</h1>
        <Form onSubmission={onSubmission} />
        <h2>
          We're sorry, there doesn't appear to be a location for that zip code.
          Please try again!
        </h2>
      </div>
    )
  }
}

export default App
