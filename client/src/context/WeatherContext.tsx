import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAstronomy,
} from "../services/weatherApi";
import type {
  CurrentWeather,
  ForecastData,
  AstronomyData,
} from "../types/weather";

interface WeatherContextValue {
  city: string;
  displayCity: string;
  current: CurrentWeather | null;
  forecast: ForecastData | null;
  astronomy: AstronomyData | null;
  isLoading: boolean;
  error: string | null;
  isDark: boolean;
  unit: "c" | "f";
  setCity: (city: string) => void;
  setDisplayCity: (city: string) => void;
  setUnit: (u: "c" | "f") => void;
  toggleDark: () => void;
  fetchAll: (q: string, displayName?: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextValue | null>(null);

export function WeatherProvider({children}: {children: ReactNode}) {
  const [city, setCity] = useState("London");
  const [displayCity, setDisplayCity] = useState("London");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [astronomy, setAstronomy] = useState<AstronomyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [unit, setUnit] = useState<"c" | "f">("c");

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  }, []);

  const fetchAll = useCallback(async (q: string, displayName?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [currentData, forecastData, astronomyData] = await Promise.all([
        fetchCurrentWeather(q),
        fetchForecast(q),
        fetchAstronomy(q),
      ]);
      setCurrent(currentData);
      setForecast(forecastData);
      setAstronomy(astronomyData);
      setCity(q);
      if (displayName) setDisplayCity(displayName);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        displayCity,
        current,
        forecast,
        astronomy,
        isLoading,
        error,
        isDark,
        unit,
        setCity,
        setDisplayCity,
        setUnit,
        toggleDark,
        fetchAll,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used within WeatherProvider");
  return ctx;
}
