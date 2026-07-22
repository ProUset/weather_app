import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";

export default function WindInfo() {
  const {current} = useWeather();
  const wind = current?.wind;
  if (!wind) return null;

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Wind
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-16 h-16">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="32"
              x2="32"
              y2="8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${wind.degree || 0}, 32, 32)`}
            />
            <circle cx="32" cy="32" r="4" fill="white" />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-light text-white">{wind.speed} km/h</p>
          <p className="text-sm text-white/50">
            {wind.dir} {wind.degree ? `(${wind.degree}°)` : ""}
          </p>
        </div>
      </div>
      {wind.gust > 0 && (
        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-white/40">Gusts</p>
          <p className="text-sm text-white">{wind.gust} km/h</p>
        </div>
      )}
    </GlassCard>
  );
}
