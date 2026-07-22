const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apiKey: process.env.WEATHERAPI_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  port: process.env.PORT || 5000,
  cacheTtl: parseInt(process.env.CACHE_TTL) || 600,
};
