"use client";

import { useWeather } from "@features/weather/api/useWeather";

// todo : 타입 중복 제거
interface Favorite {
  id: string;
  lat: number;
  lng: number;
  addressName: string;
  nickname: string;
  createdAt: number;
}

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
  onClick: (nickname: string) => void;
}

export const FavoriteCard = ({
  favorite,
  onRemove,
  onClick,
}: FavoriteCardProps) => {
  const { id, lat, lng, nickname } = favorite;

  const { data: weather, isLoading } = useWeather({ lat, lng });

  return (
    <div
      className="rounded-xl p-3 bg-white shadow-lg hover:shadow-xl transition-shadow"
      onClick={() => onClick(nickname)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 mb-1">
          <button
            onClick={() => onRemove(id)}
            className="text-yellow-400 hover:text-yellow-500 text-xl"
            title="즐겨찾기 해제"
          >
            ⭐
          </button>
          <h3 className="font-semibold truncate">{nickname}</h3>
        </div>
      </div>

      {isLoading && <p className="text-gray-400 text-sm">날씨 불러오는 중..</p>}

      {weather && (
        <div className="text-center">
          <p className="text-3xl font-bold">{Math.round(weather.temp)}°C</p>
          <p className="text-md mt-1">{weather.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            최저{" "}
            <span className="text-sm text-gray-700 font-bold">
              {Math.round(weather.tempMin)}°
            </span>{" "}
            / 최고{" "}
            <span className="text-sm text-gray-700 font-bold">
              {Math.round(weather.tempMax)}°
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
