import {useEffect} from "react";
import {useWeather} from "../context/WeatherContext";
import {ToastContainer, toast} from "react-toastify";
import CurrentWeatherCard from "../components/CurrentWeather/CurrentWeatherCard";
import HourlyForecast from "../components/Forecast/HourlyForecast";
import HourlyTempChart from "../components/Charts/HourlyTempChart";
import SevenDayForecast from "../components/Forecast/SevenDayForecast";
import AirQualityPanel from "../components/AirQuality/AirQualityPanel";
import WindInfo from "../components/Wind/WindInfo";
import AtmosphereGrid from "../components/Atmosphere/AtmosphereGrid";
import AstronomyCard from "../components/Astronomy/AstronomyCard";
import WeatherAlerts from "../components/Alerts/WeatherAlerts";
import Footer from "../components/Layout/Footer";
import {
  CurrentSkeleton,
  CardSkeleton,
  ForecastSkeleton,
} from "../components/Layout/LoadingSkeleton";
import {motion} from "framer-motion";

export default function HomePage() {
  const {city, isLoading, error, fetchAll} = useWeather();

  useEffect(() => {
    fetchAll(city);
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 space-y-6">
        <CurrentSkeleton />
        <ForecastSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length: 5}).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.4}}
      className="min-h-screen p-4 sm:p-6 space-y-5"
    >
      <div className="max-w-6xl mx-auto space-y-5">
        <CurrentWeatherCard />
        <HourlyForecast />
        <HourlyTempChart />
        <SevenDayForecast />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AirQualityPanel />
          <WindInfo />
          <AtmosphereGrid />
          <AstronomyCard />
          <div className="md:col-span-2 lg:col-span-3">
            <WeatherAlerts />
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" newestOnTop />
    </motion.div>
  );
}
