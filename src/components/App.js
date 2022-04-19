import React, { useState } from "react"

const App = (props) => {
  const [timeMessage, setTimeMessage] = useState("Loading...")
  const [currentYear, setYear] = useState(null)

  window.onload = () => {
    setYear(prompt("What year is it?"))
  }

  let currentTime = (year) => {
    if (year !== null) {
      let time =
        (Date.now() - 14400000 - (year - 1970) * 365) / 1000 / 60 / 60 / 24
      time -= Math.floor(time)

      return (time *= 100)
    }
  }

  setInterval(() => {
    setTimeMessage(
      `You are currently ${currentTime(currentYear).toFixed(
      2)}% through the day! (Eastern Time)`
    )
  }, 5000)

  return <h1>{timeMessage}</h1>
}

export default App
