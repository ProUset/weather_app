export interface Location {
  name: string;
  country: string;
  localtime?: string;
}

export interface Temperature {
  c: number;
  f: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Wind {
  speed: number;
  dir: string;
  degree?: number;
  gust: number;
}

export interface Atmosphere {
  humidity: number;
  pressure: number;
  visibility: number;
  cloud: number;
}

export interface AirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  o3: number;
  no2?: number;
  so2?: number;
}

export interface CurrentWeather {
  location: Location;
  temperature: Temperature;
  feelsLike: Temperature;
  condition: Condition;
  wind: Wind;
  atmosphere: Atmosphere;
  uv: {index: number};
  airQuality: AirQuality | null;
}

export interface HourlyData {
  time: string;
  temp: Temperature;
  condition: Condition;
  rain: number;
  wind: number;
  humidity: number;
}

export interface ForecastDay {
  date: string;
  temp: {max: Temperature; min: Temperature; avg: Temperature};
  condition: Condition;
  rain: number;
  snow?: number;
  humidity: number;
  wind: {speed: number; dir: string};
  uv: number;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  hourly: HourlyData[];
}

export interface Alert {
  headline: string;
  severity: string;
  description: string;
  instruction: string;
  effective: string;
  expires: string;
}

export interface ForecastData {
  location: Location;
  days: ForecastDay[];
  alerts: Alert[];
}

export interface AstronomyData {
  location: Location;
  astronomy: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moonPhase: string;
    moonIllumination?: string;
  };
}

export interface SearchResult {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
