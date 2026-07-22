import {type ReactNode} from "react";
import {motion} from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay}}
      className={`rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
