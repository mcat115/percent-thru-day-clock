import React from "react"

const PastSearches = (props) => {
  if (props.pastSearches.length > 0) {
    let searches = []

    props.pastSearches.forEach((search) => {
      const click = () => {
        props.fetchWeather(search)
      }
      searches.push(<li onClick={click}>{search}</li>)
    })

    return (
      <div>
        <h3>Your past searches. Click any to access again!</h3>
        <ul>{searches}</ul>
      </div>
    )
  } else {
    return null
  }
}

export default PastSearches
