import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import WeatherIcon from "../common/WeatherIcon";
import {formatTemp, formatDate} from "../../utils/formatters";
import {motion} from "framer-motion";

export default function SevenDayForecast() {
  const {forecast, unit} = useWeather();
  if (!forecast?.days?.length) return null;

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        7-Day Forecast
      </h3>
      <div className="space-y-2">
        {forecast.days.map((day, i) => (
          <motion.div
            key={day.date}
            initial={{opacity: 0, x: -10}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: i * 0.05}}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="w-24 text-sm text-white/70">
              {i === 0 ? "Today" : formatDate(day.date)}
            </span>
            <WeatherIcon
              icon={day.condition.icon}
              alt={day.condition.text}
              size={28}
            />
            <span className="flex-1 text-sm text-white/60 truncate">
              {day.condition.text}
            </span>
            <span className="text-xs text-blue-300 w-10 text-right">
              {day.rain > 0 ? `${day.rain}%` : ""}
            </span>
            <div className="flex items-center gap-2 w-24 justify-end">
              <span className="text-sm text-white/40">
                {formatTemp(day.temp.min, unit)}
              </span>
              <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                  style={{width: "60%"}}
                />
              </div>
              <span className="text-sm font-medium text-white">
                {formatTemp(day.temp.max, unit)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
