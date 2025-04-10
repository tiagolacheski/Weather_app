const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.static("./public"));
const api_key = process.env.API_KEY;
// ...
`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
app.use(express.json());

app.get("/api/v1/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    );
    const weatherData = response.data;
    res.status(200).json({
      status: 200,
      error: false,
      data: weatherData,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || err.message;

    res.status(status).json({
      status: status,
      error: true,
      message: message,
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on ${port}`));