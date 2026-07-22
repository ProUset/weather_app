import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import {formatTemp} from "../../utils/formatters";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function HourlyTempChart() {
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

  const chartData = hours.slice(0, 24).map((h) => ({
    time: h.time,
    temp: unit === "c" ? h.temp.c : h.temp.f,
    rain: h.rain || 0,
    label: `${h.time}\n${formatTemp(h.temp, unit)}`,
  }));

  return (
    <GlassCard className="p-6 w-full">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Hourly Temperature & Rain
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="time"
            tick={{fill: "rgba(255,255,255,0.5)", fontSize: 11}}
            interval={3}
          />
          <YAxis
            yAxisId="temp"
            tick={{fill: "rgba(255,255,255,0.5)", fontSize: 11}}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
            }}
            labelStyle={{color: "rgba(255,255,255,0.7)"}}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temp"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={chartData}>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
            }}
          />
          <Bar dataKey="rain" fill="#60a5fa" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
