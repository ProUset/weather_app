export function CurrentSkeleton() {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 animate-pulse">
      <div className="h-8 w-48 bg-white/20 rounded mb-4" />
      <div className="h-16 w-32 bg-white/20 rounded mb-2" />
      <div className="h-4 w-24 bg-white/20 rounded" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 animate-pulse">
      <div className="h-4 w-20 bg-white/20 rounded mb-3" />
      <div className="h-8 w-16 bg-white/20 rounded mb-2" />
      <div className="h-4 w-24 bg-white/20 rounded" />
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({length: 8}).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 min-w-[100px] animate-pulse"
        >
          <div className="h-4 w-12 bg-white/20 rounded mb-3 mx-auto" />
          <div className="h-8 w-8 bg-white/20 rounded-full mb-2 mx-auto" />
          <div className="h-4 w-10 bg-white/20 rounded mx-auto" />
        </div>
      ))}
    </div>
  );
}
