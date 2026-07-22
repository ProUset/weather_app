import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import WeatherIcon from "../common/WeatherIcon";
import {formatTemp} from "../../utils/formatters";

export default function HourlyForecast() {
  const {forecast, unit} = useWeather();
  const today = forecast?.days?.[0];
  if (!today?.hourly?.length) return null;

  const now = new Date().getHours();
  const currentHourStr = now.toString().padStart(2, "0") + ":00";
  const startIdx = today.hourly.findIndex((h) => h.time >= currentHourStr);
  const hours =
    startIdx >= 0
      ? [...today.hourly.slice(startIdx), ...today.hourly.slice(0, startIdx)]
      : today.hourly;

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Today's Hourly Forecast
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {hours.slice(0, 24).map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <span className="text-xs text-white/50">{h.time}</span>
            <WeatherIcon
              icon={h.condition.icon}
              alt={h.condition.text}
              size={32}
            />
            <span className="text-sm font-medium text-white">
              {formatTemp(h.temp, unit)}
            </span>
            <span className="text-xs text-blue-300">
              {h.rain > 0 ? `${h.rain}%` : ""}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
