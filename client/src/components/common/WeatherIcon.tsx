interface Props {
  icon: string;
  alt: string;
  size?: number;
}

export default function WeatherIcon({icon, alt, size = 64}: Props) {
  const src = icon.startsWith("//") ? `https:${icon}` : icon;
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="inline-block"
    />
  );
}
