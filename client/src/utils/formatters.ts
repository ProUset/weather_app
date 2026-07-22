export function formatTemp(temp: { c: number; f: number }, unit: 'c' | 'f'): string {
  const value = unit === 'f' ? temp.f : temp.c;
  return `${Math.round(value)}°`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

export function formatTime24(timeStr: string): string {
  return timeStr;
}

export function windDegreeToDir(degree: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return dirs[index];
}

export function getUVLabel(index: number): string {
  if (index <= 2) return 'Low';
  if (index <= 5) return 'Moderate';
  if (index <= 7) return 'High';
  if (index <= 10) return 'Very High';
  return 'Extreme';
}

export function getUVRecommendation(index: number): string {
  if (index <= 2) return 'No protection needed';
  if (index <= 5) return 'Wear sunscreen if outdoors';
  if (index <= 7) return 'Seek shade during midday';
  if (index <= 10) return 'Avoid being outdoors if possible';
  return 'Extreme - take all precautions';
}

export function getAQILabel(aqi: number): string {
  const labels = ['', 'Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
  return labels[aqi] || 'Unknown';
}

export function getAQIColor(aqi: number): string {
  const colors = ['', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-purple-500', 'bg-rose-800'];
  return colors[aqi] || 'bg-gray-500';
}
