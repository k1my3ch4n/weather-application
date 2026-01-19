import { WeatherIcon } from "@shared/ui/WeatherIcon";

// todo : 타입 중복 제거
interface HourlyTempType {
  time: string;
  date: string | null;
  temp: number;
  icon: string;
  description: string;
}

interface ForecastItemProps {
  item: HourlyTempType;
  isFirst?: boolean;
}

export const ForecastItem = ({ item, isFirst = false }: ForecastItemProps) => {
  const { time, date, temp, icon, description } = item;

  const dividerStyle = isFirst
    ? ""
    : date
      ? "border-l-2 border-blue-400"
      : "border-l border-gray-200";

  return (
    <li
      className={`flex-shrink-0 text-center px-4 first:pl-0 last:pr-0 ${dividerStyle}`}
    >
      <p className="text-xs text-gray-700 font-bold h-4 mb-1">{date ?? ""}</p>
      <p className="text-sm text-gray-500">{time}</p>
      <WeatherIcon icon={icon} description={description} />
      <p className="text-lg font-bold">{Math.round(temp)}°</p>
    </li>
  );
};
