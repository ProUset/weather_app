import {useWeather} from "../../context/WeatherContext";
import GlassCard from "../common/GlassCard";
import {motion, AnimatePresence} from "framer-motion";

export default function WeatherAlerts() {
  const {forecast} = useWeather();
  const alerts = forecast?.alerts;
  if (!alerts?.length) return null;

  return (
    <GlassCard className="p-6 w-full border-red-400/30">
      <h3 className="text-sm font-semibold text-red-300 uppercase tracking-wider mb-4">
        Weather Alerts
      </h3>
      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((a, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: "auto"}}
              transition={{delay: i * 0.1}}
              className="p-4 rounded-xl bg-red-500/10 border border-red-400/20"
            >
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-300">
                    {a.headline}
                  </p>
                  <p className="text-xs text-red-200/60 mt-0.5 capitalize">
                    Severity: {a.severity}
                  </p>
                  <p className="text-sm text-white/70 mt-2">{a.description}</p>
                  {a.instruction && (
                    <p className="text-sm text-orange-300 mt-1">
                      ⚠ {a.instruction}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
