document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const weatherForm = document.getElementById('weather-form');
  const cityInput = document.getElementById('city-input');
  const weatherContainer = document.getElementById('weather-container');
  const errorContainer = document.getElementById('error-container');
  const recentList = document.getElementById('recent-list');

  // Constants
  const ICON_URL = 'https://openweathermap.org/img/wn/';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const RECENT_SEARCHES_KEY = 'weatherAppRecentSearches';
  const MAX_RECENT_SEARCHES = 5;

  // Event Listeners
  weatherForm.addEventListener('submit', handleFormSubmit);

  // Functions
  async function handleFormSubmit(e) {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    
    if (!cityName) {
      showError('Please enter a city name');
      return;
    }

    try {
      const response = await fetch(`/api/v1/weather/${encodeURIComponent(cityName)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const weatherData = await response.json();
      displayWeather(weatherData.data);
      addToRecentSearches(cityName);
      clearError();
    } catch (error) {
      showError(error.message);
    }
  }

  function displayWeather(data) {
    const { name, dt, main, weather, coord } = data;
    const date = formatDate(dt);

    weatherContainer.innerHTML = `
      <div class="weather-card">
        <div class="weather-header">
          <h2>${name}</h2>
          <p class="weather-date"><i class="fas fa-calendar-alt"></i> ${date}</p>
        </div>
        
        <div class="weather-main">
          <div class="weather-condition">
            <img src="${ICON_URL}${weather[0].icon}@2x.png" alt="${weather[0].description}">
            <span>${weather[0].main}</span>
            <p class="weather-description">${weather[0].description}</p>
          </div>
          
          <div class="weather-temp">
            <p><i class="fas fa-temperature-high"></i> ${kelvinToCelsius(main.temp)}°C</p>
            <p>Feels like: ${kelvinToCelsius(main.feels_like)}°C</p>
            <p>Humidity: ${main.humidity}%</p>
          </div>
        </div>
        
        <div class="weather-details">
          <div class="detail-item">
            <h4><i class="fas fa-map-marker-alt"></i> Coordinates</h4>
            <p>Lat: ${coord.lat.toFixed(2)}</p>
            <p>Lon: ${coord.lon.toFixed(2)}</p>
          </div>
          
          <div class="detail-item">
            <h4><i class="fas fa-wind"></i> Wind</h4>
            <p>Pressure: ${main.pressure} hPa</p>
          </div>
        </div>
      </div>
    `;
    
    cityInput.value = '';
  }

  function showError(message) {
    errorContainer.hidden = false;
    errorContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
      </div>
    `;
    
    weatherContainer.innerHTML = `
      <div class="weather-placeholder">
        <i class="fas fa-exclamation-circle"></i>
        <p>Could not load weather data</p>
      </div>
    `;
  }

  function clearError() {
    errorContainer.hidden = true;
    errorContainer.innerHTML = '';
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
  }

  function addToRecentSearches(cityName) {
    let recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
    
    // Remove if already exists
    recentSearches = recentSearches.filter(city => city.toLowerCase() !== cityName.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(cityName);
    
    // Keep only most recent searches
    if (recentSearches.length > MAX_RECENT_SEARCHES) {
      recentSearches.pop();
    }
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
    updateRecentSearchesUI(recentSearches);
  }

  function updateRecentSearchesUI(searches) {
    if (searches.length > 0) {
      document.querySelector('.recent-searches').hidden = false;
      recentList.innerHTML = searches.map(city => `
        <li>
          <button class="recent-search-btn" data-city="${city}">
            <i class="fas fa-search"></i> ${city}
          </button>
        </li>
      `).join('');
      
      // Add event listeners to recent search buttons
      document.querySelectorAll('.recent-search-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          cityInput.value = e.currentTarget.dataset.city;
          weatherForm.dispatchEvent(new Event('submit'));
        });
      });
    }
  }

  // Initialize recent searches
  const recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  updateRecentSearchesUI(recentSearches);
});