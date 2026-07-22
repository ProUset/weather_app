import {useState, useEffect, useRef} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import {searchLocation} from "../../services/weatherApi";
import type {SearchResult} from "../../types/weather";

interface Props {
  onSelect: (query: string, displayName: string) => void;
}

export default function SearchBar({onSelect}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const debounced = useDebounce(query, 300);

  useEffect(() => {
    if (debounced.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    searchLocation(debounced).then((data) => {
      setResults(data);
      setOpen(data.length > 0);
      setActiveIdx(-1);
    });
  }, [debounced]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(r: SearchResult) {
    const display = `${r.name}, ${r.country}`;
    setQuery(display);
    setOpen(false);
    onSelect(`${r.lat},${r.lon}`, display);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      handleSelect(results[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search city..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      </div>
      {open && (
        <div className="absolute top-full mt-1 w-full rounded-xl bg-gray-900/90 backdrop-blur-xl border border-white/20 overflow-hidden z-50">
          {results.map((r, i) => (
            <button
              key={`${r.lat}-${r.lon}`}
              onClick={() => handleSelect(r)}
              onMouseEnter={() => setActiveIdx(i)}
              className={`w-full text-left px-4 py-2.5 text-sm text-white transition-colors ${i === activeIdx ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              <span className="font-medium">{r.name}</span>
              <span className="text-white/50 ml-2">
                {r.region}, {r.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
