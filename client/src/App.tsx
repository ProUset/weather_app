import {useWeather} from "./context/WeatherContext";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

export default function App() {
  const {isDark} = useWeather();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "dark" : ""}`}
    >
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
        <Navbar />
        <HomePage />
      </div>
    </div>
  );
}
