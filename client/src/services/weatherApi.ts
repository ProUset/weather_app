import axios from "axios";
import type {
  CurrentWeather,
  ForecastData,
  SearchResult,
  AstronomyData,
  Alert,
} from "../types/weather";

const api = axios.create({
  baseURL: "/api/weather",
  timeout: 15000,
});

export async function fetchCurrentWeather(q: string): Promise<CurrentWeather> {
  const {data} = await api.get("/current", {params: {q}});
  return data;
}

export async function fetchForecast(
  q: string,
  days = 7,
): Promise<ForecastData> {
  const {data} = await api.get("/forecast", {params: {q, days}});
  return data;
}

export async function searchLocation(q: string): Promise<SearchResult[]> {
  if (!q || q.length < 2) return [];
  const {data} = await api.get("/search", {params: {q}});
  return data;
}

export async function fetchAstronomy(q: string): Promise<AstronomyData> {
  const {data} = await api.get("/astronomy", {params: {q}});
  return data;
}

export async function fetchAlerts(q: string): Promise<Alert[]> {
  const {data} = await api.get("/alerts", {params: {q}});
  return data.alerts || [];
}
