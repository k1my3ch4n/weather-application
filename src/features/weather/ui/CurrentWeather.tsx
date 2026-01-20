"use client";

import { IconButton } from "@shared/ui/IconButton";
import { InfoLabel } from "@shared/ui/InfoLabel";
import { WeatherIcon } from "@shared/ui/WeatherIcon";
import { WeatherDataType } from "../types";

interface CurrentWeatherProps {
  addressName: string;
  weather: WeatherDataType;
  isFavorite: boolean;
  isFull: boolean;
  onAddFavorite: () => void;
  onRemoveCurrentFavorite: () => void;
}

export const CurrentWeather = ({
  addressName,
  weather,
  isFavorite,
  isFull,
  onAddFavorite,
  onRemoveCurrentFavorite,
}: CurrentWeatherProps) => {
  // todo : 날짜 포맷 분리
  const today = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {isFavorite ? (
          <IconButton
            icon="⭐"
            onClick={onRemoveCurrentFavorite}
            variant="transparent"
            size="lg"
            title="즐겨찾기 해제"
          />
        ) : (
          <IconButton
            icon="☆"
            onClick={onAddFavorite}
            variant="transparent"
            size="lg"
            disabled={isFull}
            title={isFull ? "즐겨찾기 최대 6개" : "즐겨찾기 추가"}
          />
        )}
        <h2 className="font-semibold">{addressName}</h2>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-1">{today}</p>
        <WeatherIcon
          icon={weather.icon}
          description={weather.description}
          size="lg"
        />
        <p className="text-4xl font-bold">{Math.round(weather.temp)}°C</p>
        <p className="text-sm text-gray-500 mt-1">
          <InfoLabel
            label="최저"
            value={`${Math.round(weather.tempMin)}°`}
            size="lg"
          />
          {" / "}
          <InfoLabel
            label="최고"
            value={`${Math.round(weather.tempMax)}°`}
            size="lg"
          />
          {" / "}
          <InfoLabel
            label="체감"
            value={`${Math.round(weather.feelsLike)}°`}
            size="lg"
          />
        </p>
      </div>
    </div>
  );
};
