import React from "react"
import Form from "./Form"
import PastSearches from "./PastSearches"

const Header = (props) => {
  return (
    <>
      <h1>Welcome to the USA weather map machine!</h1>
      <Form onSubmission={props.onSubmission} />
      <p>
        Next time you visit this page, all the searches from this session will
        be added here, so you can easily access them again!
      </p>
      <PastSearches
        pastSearches={props.pastSearches}
        fetchWeather={props.fetchWeather}
      />
    </>
  )
}

export default Header
