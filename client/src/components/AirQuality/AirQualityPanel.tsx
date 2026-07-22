import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import {getAQILabel, getAQIColor} from "../../utils/formatters";

export default function AirQualityPanel() {
  const {current} = useWeather();
  const aq = current?.airQuality;
  if (!aq) return null;

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Air Quality
      </h3>
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full ${getAQIColor(aq.aqi)} flex items-center justify-center text-white font-bold text-sm`}
        >
          {aq.aqi}
        </div>
        <div>
          <p className="text-white font-medium">{getAQILabel(aq.aqi)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-white/40">PM2.5</p>
          <p className="text-sm text-white">{aq.pm25.toFixed(1)} µg/m³</p>
        </div>
        <div>
          <p className="text-xs text-white/40">PM10</p>
          <p className="text-sm text-white">{aq.pm10.toFixed(1)} µg/m³</p>
        </div>
        <div>
          <p className="text-xs text-white/40">CO</p>
          <p className="text-sm text-white">{aq.co.toFixed(1)} µg/m³</p>
        </div>
        <div>
          <p className="text-xs text-white/40">O₃</p>
          <p className="text-sm text-white">{aq.o3?.toFixed(1)} µg/m³</p>
        </div>
      </div>
    </GlassCard>
  );
}
