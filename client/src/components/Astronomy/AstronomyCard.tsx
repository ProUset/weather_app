import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import {formatTime} from "../../utils/formatters";

export default function AstronomyCard() {
  const {astronomy} = useWeather();
  const astro = astronomy?.astronomy;
  if (!astro) return null;

  const moonPhases: Record<string, string> = {
    "New Moon": "🌑",
    "Waxing Crescent": "🌒",
    "First Quarter": "🌓",
    "Waxing Gibbous": "🌔",
    "Full Moon": "🌕",
    "Waning Gibbous": "🌖",
    "Last Quarter": "🌗",
    "Waning Crescent": "🌘",
  };

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Astronomy
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-white/40">Sunrise</p>
          <p className="text-lg text-white">{formatTime(astro.sunrise)}</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Sunset</p>
          <p className="text-lg text-white">{formatTime(astro.sunset)}</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Moonrise</p>
          <p className="text-lg text-white">{formatTime(astro.moonrise)}</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Moonset</p>
          <p className="text-lg text-white">{formatTime(astro.moonset)}</p>
        </div>
        <div className="col-span-2 sm:col-span-4 pt-3 border-t border-white/10 flex items-center gap-3">
          <span className="text-2xl">
            {moonPhases[astro.moonPhase] || "🌙"}
          </span>
          <div>
            <p className="text-sm font-medium text-white">{astro.moonPhase}</p>
            {astro.moonIllumination && (
              <p className="text-xs text-white/40">
                Illumination: {astro.moonIllumination}%
              </p>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
