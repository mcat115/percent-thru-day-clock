import React, { useState } from "react"

const App = (props) => {
  const [timeMessage, setTimeMessage] = useState("Loading...")
  const [currentYear, setYear] = useState("Loading...")
  const [timeVar, setTimeVar] = useState("Loading...")

  window.onload = () => {
    setYear(prompt("What year is it?"))
    let savingsStatus = (prompt(
      'Is the clock currently in daylight savings time? (March - November) Type "yes" or "no"'
    ))
    
    if (
      savingsStatus.toLowerCase() === "y" ||
      savingsStatus.toLowerCase() === "yes"
    ) {
      setTimeVar(14400000)
    } else {
      setTimeVar(18000000)
    }
  }

  let currentTime = (year, daylightSavingsAdjustment) => {
    let time =
      (Date.now() - daylightSavingsAdjustment - (year - 1970) * 365 * 24 * 60 * 60 * 1000) /
      1000 /
      60 /
      60 /
      24
    time -= Math.floor(time)

    return time *= 100
  }

  setInterval(() => {
    setTimeMessage(`You are currently ${currentTime(currentYear, timeVar).toFixed(2)}% through the day! (Eastern Time)`)
  }, 5000);

  return <h1>{timeMessage}</h1>
}

export default App
