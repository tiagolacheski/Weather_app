const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()

app.use(express.static("./public"))
const api_key = process.env.API_KEY

app.use(express.json())

app.get("/api/v1/weather/:city", (req, res) => {
  //   res.send(req.params.city)
  try {
    const city = req.params.city
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`,
      )
      .then((response) => {
        const weatherData = response.data
        res.status(200).json({
          status: 200,
          error: false,
          data: weatherData,
        })
      })
      .catch((err) => {
        res.status(404).json({
          status: 404,
          error: true,
          message: err.message,
        })
      })
  } catch (err) {
    res.status(400).json({
      status: 400,
      error: true,
      message: err,
    })
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on ${port}`))
