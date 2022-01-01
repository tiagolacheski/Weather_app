const city = document.getElementById("city")
const submitBtn = document.getElementById("submit-city")
const renderDetails = document.getElementById("weather-details-container")
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

const iconUrl = "http://openweathermap.org/img/wn/"

submitBtn.addEventListener("click", async () => {
  console.log(city.value)
  const cityName = city.value

  const res = await fetch(`/api/v1/weather/${cityName}`)

  const weather = await res.json()

  if (!weather.error) {
    renderCard(weather.data)
  } else {
    showError(weather)
  }
})

const renderCard = (data) => {
  const { name, dt, coord, main, weather } = data

  const currentDate = new Date(dt * 1000)
  const date = `${
    months[currentDate.getMonth()] +
    " " +
    currentDate.getDate() +
    ", " +
    currentDate.getFullYear()
  }`

  let template = `
    <div class="card">
                <div
                  class="cart-title d-flex flex-row justify-content-between container-fluid"
                >
                  <h3>${name}</h3>
                  <p><i class="fas fa-calendar-day"></i> Date: ${date}</p>
                </div>
                <div class="card-body custom-grid">
                  <div class="weather">
                    <h4>
                      <img src="${iconUrl}${weather[0].icon}@2x.png" />
                      ${weather[0].main}
                    </h4>
                  </div>
                  <div class="cord">
                    <h4>
                      <i class="fas fa-map-marker-alt text-primary"></i
                      >&nbsp;Co-Ordinates
                    </h4>
                    <p><strong>long:</strong> ${
                      coord.lon
                    } <strong>lat:</strong> ${coord.lat}</p>
                  </div>
                  <div class="main">
                    <h4><i class="fas fa-temperature-low"></i>&nbsp;Temp</h4>
                    <p><strong>Current: </strong>${parseFloat(
                      main.temp - 273.15,
                    ).toPrecision(4)}&deg; C</p>
                    <p><strong>Feels like: </strong>${parseFloat(
                      main.feels_like - 273.15,
                    ).toPrecision(4)}&deg; C</p>
                  </div>
                </div>
              </div>
              `
  city.value = ""
  renderDetails.innerHTML = template
}

const showError = (err) => {
  city.value = ""
  renderDetails.innerHTML = ""

  let temp = `
        <div class="card card-body error text-center">
            <h2>${err.message}. Please try again later.</h2>
        </div>
    `
  renderDetails.innerHTML = temp

  setTimeout(() => {
    window.location.reload()
  }, 5000)
}
