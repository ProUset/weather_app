import {useWeather} from "../../context/WeatherContext";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle";
import UnitToggle from "./UnitToggle";

export default function Navbar() {
  const {fetchAll} = useWeather();

  return (
    <nav className="flex items-center gap-4 px-4 sm:px-6 py-4 flex-wrap">
      <h1 className="text-xl font-bold text-white tracking-tight whitespace-nowrap">
        WeatherIntel
      </h1>
      <div className="flex-1 min-w-[200px]">
        <SearchBar onSelect={(query, display) => fetchAll(query, display)} />
      </div>
      <div className="flex items-center gap-2">
        <UnitToggle />
        <DarkModeToggle />
      </div>
    </nav>
  );
}
