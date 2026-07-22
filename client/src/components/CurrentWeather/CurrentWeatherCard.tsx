import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import WeatherIcon from "../common/WeatherIcon";
import {formatTemp, formatTime} from "../../utils/formatters";

export default function CurrentWeatherCard() {
  const {current, unit} = useWeather();
  if (!current) return null;

  return (
    <GlassCard className="p-6 sm:p-8 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
        <WeatherIcon
          icon={current.condition.icon}
          alt={current.condition.text}
          size={96}
        />
        <div className="text-center sm:text-left">
          <p className="text-6xl sm:text-7xl font-light text-white">
            {formatTemp(current.temperature, unit)}
          </p>
          <p className="text-xl text-white/80 mt-1">{current.condition.text}</p>
          <p className="text-base text-white/50 mt-1">
            Feels like {formatTemp(current.feelsLike, unit)}
          </p>
        </div>
        <div className="sm:ml-auto text-center sm:text-right">
          <p className="text-2xl font-semibold text-white">
            {current.location.name}
          </p>
          <p className="text-sm text-white/50">{current.location.country}</p>
          {current.location.localtime && (
            <p className="text-xs text-white/40 mt-1">
              Updated {formatTime(current.location.localtime.split(" ")[1])}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
