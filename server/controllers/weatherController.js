const weatherService = require('../services/weatherService');

async function current(req, res, next) {
  try {
    const data = await weatherService.getCurrentWeather(req.query.q);
    const current = data.current;
    const location = data.location;
    res.json({
      location: { name: location.name, country: location.country, localtime: location.localtime },
      temperature: { c: current.temp_c, f: current.temp_f },
      feelsLike: { c: current.feelslike_c, f: current.feelslike_f },
      condition: { text: current.condition.text, icon: current.condition.icon, code: current.condition.code },
      wind: { speed: current.wind_kph, dir: current.wind_dir, degree: current.wind_degree, gust: current.gust_kph },
      atmosphere: { humidity: current.humidity, pressure: current.pressure_mb, visibility: current.vis_km, cloud: current.cloud },
      uv: { index: current.uv },
      airQuality: current.air_quality ? {
        aqi: current.air_quality['us-epa-index'],
        pm25: current.air_quality.pm2_5,
        pm10: current.air_quality.pm10,
        co: current.air_quality.co,
        o3: current.air_quality.o3,
        no2: current.air_quality.no2,
        so2: current.air_quality.so2,
      } : null,
    });
  } catch (err) {
    next(err);
  }
}

async function forecast(req, res, next) {
  try {
    const days = Math.min(parseInt(req.query.days) || 7, 7);
    const data = await weatherService.getForecast(req.query.q, days);
    const location = data.location;
    const forecastDays = data.forecast.forecastday.map((day) => ({
      date: day.date,
      temp: { max: { c: day.day.maxtemp_c, f: day.day.maxtemp_f }, min: { c: day.day.mintemp_c, f: day.day.mintemp_f }, avg: { c: day.day.avgtemp_c, f: day.day.avgtemp_f } },
      condition: { text: day.day.condition.text, icon: day.day.condition.icon, code: day.day.condition.code },
      rain: day.day.daily_chance_of_rain,
      snow: day.day.daily_chance_of_snow,
      humidity: day.day.avghumidity,
      wind: { speed: day.day.maxwind_kph, dir: day.day.maxwind_dir },
      uv: day.day.uv,
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset,
      moonrise: day.astro.moonrise,
      moonset: day.astro.moonset,
      moonPhase: day.astro.moon_phase,
      hourly: day.hour.map((h) => ({
        time: h.time.split(' ')[1],
        temp: { c: h.temp_c, f: h.temp_f },
        condition: { text: h.condition.text, icon: h.condition.icon, code: h.condition.code },
        rain: h.chance_of_rain,
        wind: h.wind_kph,
        humidity: h.humidity,
      })),
    }));

    const alerts = data.alerts?.alert?.length
      ? data.alerts.alert.map((a) => ({
          headline: a.headline,
          severity: a.severity,
          description: a.desc,
          instruction: a.instruction,
          effective: a.effective,
          expires: a.expires,
        }))
      : [];

    res.json({
      location: { name: location.name, country: location.country },
      days: forecastDays,
      alerts,
    });
  } catch (err) {
    next(err);
  }
}

async function search(req, res, next) {
  try {
    const data = await weatherService.searchLocation(req.query.q);
    res.json(data.map((item) => ({
      name: item.name,
      region: item.region,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
      url: item.url,
    })));
  } catch (err) {
    next(err);
  }
}

async function astronomy(req, res, next) {
  try {
    const data = await weatherService.getAstronomy(req.query.q);
    const astro = data.astronomy.astro;
    res.json({
      location: { name: data.location.name, country: data.location.country },
      astronomy: {
        sunrise: astro.sunrise,
        sunset: astro.sunset,
        moonrise: astro.moonrise,
        moonset: astro.moonset,
        moonPhase: astro.moon_phase,
        moonIllumination: astro.moon_illumination,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function alerts(req, res, next) {
  try {
    const data = await weatherService.getAlerts(req.query.q);
    const alerts = data.alerts?.alert?.length
      ? data.alerts.alert.map((a) => ({
          headline: a.headline,
          severity: a.severity,
          description: a.desc,
          instruction: a.instruction,
          effective: a.effective,
          expires: a.expires,
        }))
      : [];
    res.json({ location: { name: data.location.name, country: data.location.country }, alerts });
  } catch (err) {
    next(err);
  }
}

async function airQuality(req, res, next) {
  try {
    const data = await weatherService.getCurrentWeather(req.query.q);
    const aq = data.current.air_quality;
    res.json({
      location: { name: data.location.name, country: data.location.country },
      airQuality: aq ? {
        aqi: aq['us-epa-index'],
        pm25: aq.pm2_5,
        pm10: aq.pm10,
        co: aq.co,
        o3: aq.o3,
        no2: aq.no2,
        so2: aq.so2,
      } : null,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { current, forecast, search, astronomy, alerts, airQuality };
