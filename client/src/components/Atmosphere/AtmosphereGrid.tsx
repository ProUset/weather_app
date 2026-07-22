import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import {getUVLabel, getUVRecommendation} from "../../utils/formatters";

export default function AtmosphereGrid() {
  const {current} = useWeather();
  const atmo = current?.atmosphere;
  const uv = current?.uv;
  if (!atmo) return null;

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Atmosphere
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-white/40">Humidity</p>
          <p className="text-xl font-light text-white">{atmo.humidity}%</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Pressure</p>
          <p className="text-xl font-light text-white">{atmo.pressure} mb</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Visibility</p>
          <p className="text-xl font-light text-white">{atmo.visibility} km</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Cloud Cover</p>
          <p className="text-xl font-light text-white">{atmo.cloud}%</p>
        </div>
        {uv && (
          <div className="col-span-2 sm:col-span-4 pt-3 border-t border-white/10">
            <p className="text-xs text-white/40">UV Index</p>
            <div className="flex items-center gap-3 mt-1">
              <div className="text-2xl font-light text-white">{uv.index}</div>
              <div className="flex-1 max-w-xs">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 to-purple-600" />
                <div className="flex justify-between text-[10px] text-white/30 mt-0.5">
                  <span>0</span>
                  <span>3</span>
                  <span>6</span>
                  <span>8</span>
                  <span>11+</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-white font-medium">
                  {getUVLabel(uv.index)}
                </p>
                <p className="text-xs text-white/40">
                  {getUVRecommendation(uv.index)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
