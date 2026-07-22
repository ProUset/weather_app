import {useWeather} from "../../context/WeatherContext";

export default function UnitToggle() {
  const {unit, setUnit} = useWeather();

  return (
    <div className="flex items-center bg-white/10 rounded-full p-0.5">
      <button
        onClick={() => setUnit("c")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${unit === "c" ? "bg-white/30 text-white" : "text-white/60 hover:text-white"}`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit("f")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${unit === "f" ? "bg-white/30 text-white" : "text-white/60 hover:text-white"}`}
      >
        °F
      </button>
    </div>
  );
}
