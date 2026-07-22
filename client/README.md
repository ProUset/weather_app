# Weather Intelligence Platform

A modern weather platform that provides real-time weather information, forecasts, air quality, UV index, sunrise/sunset, and location-based insights.

## Features

Current Weather, Hourly Forecast (with Recharts dual chart), 7-Day Forecast, Air Quality, Wind, Humidity/Pressure/Visibility, UV Index, Astronomy, Weather Alerts (conditional), and Location Search (autocomplete). Dark/light mode, °C/°F toggle, glassmorphism cards, Framer Motion animations, loading skeletons, toast errors, responsive layout.

## Tech Stack

- Frontend: React 18 + TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, react-toastify
- Backend: Node.js, Express, node-cache, axios
- API Proxy: All WeatherAPI calls go through Express server (key stored in .env)

## Installation

```bash
git clone https://github.com/VaibhavPandey-1221/Weather_Information_Application.git
cd weather-intelligence-platform

# Install frontend
cd client
npm install
npm run dev
```

In a new terminal:

```bash
cd server
npm install
npm run dev
```
