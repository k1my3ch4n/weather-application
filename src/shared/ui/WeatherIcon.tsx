import Image from "next/image";

interface WeatherIconProps {
  icon: string;
  description: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: 40,
  md: 60,
  lg: 80,
};

export const WeatherIcon = ({
  icon,
  description,
  size = "md",
}: WeatherIconProps) => {
  const pixelSize = sizeStyles[size];

  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
      alt={description}
      width={pixelSize}
      height={pixelSize}
      className="mx-auto drop-shadow-md"
    />
  );
};
