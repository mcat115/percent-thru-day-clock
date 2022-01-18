import React, { useState } from "react"

export const App = (props) => {
  let currentYear = prompt("What year is it?")
  let savingsStatus = prompt(
    'Is the clock currently in daylight savings time? (March - November) Type "yes" or "no"'
  )
  let timeVar

  if (
    savingsStatus.toLowerCase() === "y" ||
    savingsStatus.toLowerCase() === "yes"
  ) {
    timeVar = 14400000
  } else {
    timeVar = 18000000
  }

  let currentTime = (year) => {
    let time =
      (Date.now() - timeVar - (year - 1970) * 365 * 24 * 60 * 60 * 1000) /
      1000 /
      60 /
      60 /
      24
    time -= Math.floor(time)
    time *= 100

    return time
  }

  let message = `You are currently ${currentTime(currentYear).toFixed(
    2
  )}% through the day! (Eastern Time)`

  return <h1>{message}</h1>
}

export default App