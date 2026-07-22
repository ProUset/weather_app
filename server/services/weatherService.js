const axios = require('axios');
const { apiKey } = require('../config/env');
const cache = require('../config/cache');

const BASE_URL = 'https://api.weatherapi.com/v1';

async function fetchFromWeatherAPI(endpoint, params) {
  const cacheKey = `${endpoint}?${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    params: { key: apiKey, ...params },
    timeout: 10000,
  });

  cache.set(cacheKey, response.data);
  return response.data;
}

async function getCurrentWeather(q) {
  return fetchFromWeatherAPI('/current.json', { q, aqi: 'yes' });
}

async function getForecast(q, days = 7) {
  return fetchFromWeatherAPI('/forecast.json', { q, days, aqi: 'yes', alerts: 'yes' });
}

async function searchLocation(q) {
  return fetchFromWeatherAPI('/search.json', { q });
}

async function getAstronomy(q) {
  const date = new Date().toISOString().split('T')[0];
  return fetchFromWeatherAPI('/astronomy.json', { q, dt: date });
}

async function getAlerts(q) {
  return fetchFromWeatherAPI('/forecast.json', { q, days: 1, alerts: 'yes' });
}

module.exports = {
  getCurrentWeather,
  getForecast,
  searchLocation,
  getAstronomy,
  getAlerts,
};
