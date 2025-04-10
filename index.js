const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

// Configuration Constants
const CONFIG = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  API_KEY: process.env.API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // 15 minutes
    MAX: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
  },
  REQUEST_TIMEOUT: parseInt(process.env.REQUEST_TIMEOUT, 10) || 10000 // 10 seconds
};

// Validate required configuration
if (!CONFIG.API_KEY) {
  console.error('❌ Missing required environment variable: API_KEY');
  process.exit(1);
}

// Initialize Express application
const app = express();

// ======================
// Middleware Setup
// ======================

// Security Headers
app.use(helmet());
app.disable('x-powered-by');

// Request Logging
app.use(morgan(CONFIG.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Rate Limiting
app.use(
  rateLimit({
    windowMs: CONFIG.RATE_LIMIT.WINDOW_MS,
    max: CONFIG.RATE_LIMIT.MAX,
    message: {
      status: 429,
      error: true,
      message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Static Files
app.use(express.static('public'));

// ======================
// API Routes
// ======================

/**
 * Health Check Endpoint
 * @returns {Object} Application health status
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: CONFIG.NODE_ENV,
    uptime: process.uptime(),
    version: process.env.npm_package_version
  });
});

/**
 * Weather Data Endpoint
 * @param {string} city - City name to get weather for
 * @returns {Object} Weather data or error message
 */
app.get('/api/v1/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;

    // Validate input
    if (!city?.trim()) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'City parameter is required'
      });
    }

    // Fetch weather data
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city.trim(),
          appid: CONFIG.API_KEY,
          units: 'metric'
        },
        timeout: CONFIG.REQUEST_TIMEOUT
      }
    );

    // Transform response
    const { main, weather, name, dt } = response.data;
    const weatherResponse = {
      status: 200,
      error: false,
      data: {
        city: name,
        timestamp: new Date(dt * 1000).toISOString(),
        temperature: main.temp,
        feels_like: main.feels_like,
        humidity: main.humidity,
        pressure: main.pressure,
        conditions: weather[0].main,
        description: weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
      }
    };

    res.status(200).json(weatherResponse);
  } catch (error) {
    console.error('Weather API Error:', error.message);

    const errorResponse = {
      status: error.response?.status || (error.code === 'ECONNABORTED' ? 504 : 500),
      error: true,
      message:
        error.response?.data?.message ||
        error.message ||
        'Weather service unavailable',
      ...(error.response?.data && { details: error.response.data })
    };

    res.status(errorResponse.status).json(errorResponse);
  }
});

// ======================
// Error Handlers
// ======================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: true,
    message: 'Endpoint not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🚨 Application Error:', err.stack);
  res.status(500).json({
    status: 500,
    error: true,
    message: 'Internal server error',
    ...(CONFIG.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ======================
// Server Initialization
// ======================

app.listen(CONFIG.PORT, () => {
  console.log(`
  🌦️ Weather App Server Started!
  ------------------------------
  Environment: ${CONFIG.NODE_ENV}
  Listening on: http://localhost:${CONFIG.PORT}
  Rate Limit: ${CONFIG.RATE_LIMIT.MAX} requests per ${CONFIG.RATE_LIMIT.WINDOW_MS / 60000} minutes
  `);
});