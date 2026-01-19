"use client";

import { useState } from "react";
import { useCoordinates } from "@features/location/api/useCoordinates";
import { useWeather } from "@features/weather/api/useWeather";
import { useForecast } from "@features/weather/api/useForecast";
import { useFavorites } from "@features/favorites/hooks/useFavorites";
import { FavoriteCard } from "@features/favorites/ui/FavoriteCard";
import { IconButton } from "@shared/ui/IconButton";

// todo : 추후 사용자 위치 기반 초기 주소 설정
const DEFAULT_ADDRESS = "서울특별시 강남구 역삼동";

export default function Home() {
  const [address, setAddress] = useState<string>(DEFAULT_ADDRESS);
  const [searchAddress, setSearchAddress] = useState<string | null>(
    DEFAULT_ADDRESS,
  );

  const {
    favorites,
    addFavorite,
    removeFavorite,
    updateNickname,
    isFavorite,
    isFull,
  } = useFavorites();

  const { data: coords, isLoading: coordsLoading } =
    useCoordinates(searchAddress);

  const { data: weather, isLoading: weatherLoading } = useWeather(
    coords ? { lat: coords.lat, lng: coords.lng } : null,
  );

  const { data: forecast, isLoading: forecastLoading } = useForecast(
    coords ? { lat: coords.lat, lng: coords.lng } : null,
  );

  const handleSearch = () => {
    setSearchAddress(address);
  };

  const handleAddFavorite = () => {
    if (!coords || !searchAddress) {
      return;
    }

    addFavorite({
      lat: coords.lat,
      lng: coords.lng,
      addressName: searchAddress,
    });
  };

  const handleFavoriteClick = (nickname: string) => {
    setAddress(nickname);
    setSearchAddress(nickname);
  };

  const handleRemoveCurrentFavorite = () => {
    if (!coords) {
      return;
    }

    const currentFavorite = favorites.find(
      (favorite) => favorite.lat === coords.lat && favorite.lng === coords.lng,
    );

    if (currentFavorite) {
      removeFavorite(currentFavorite.id);
    }
  };

  const isCurrentFavorite = coords ? isFavorite(coords.lat, coords.lng) : false;

  const isLoading = coordsLoading || weatherLoading || forecastLoading;

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="md:border-r md:border-gray-200 md:pr-6">
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="지역명 입력"
            />
            <button onClick={handleSearch}>검색</button>
          </div>

          {isLoading && <p>로딩 중...</p>}

          {weather && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                {isCurrentFavorite ? (
                  <IconButton
                    icon="⭐"
                    onClick={handleRemoveCurrentFavorite}
                    variant="transparent"
                    size="lg"
                    title="즐겨찾기 해제"
                  />
                ) : (
                  <IconButton
                    icon="☆"
                    onClick={handleAddFavorite}
                    variant="transparent"
                    size="lg"
                    disabled={isFull}
                    title={isFull ? "즐겨찾기 최대 6개" : "즐겨찾기 추가"}
                  />
                )}
                <h2 className="font-semibold">{searchAddress}</h2>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date().toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  })}
                </p>
                <p className="text-4xl font-bold">
                  {Math.round(weather.temp)}°C
                </p>
                <p className="text-lg mt-1">{weather.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  최저{" "}
                  <span className="text-base text-gray-700 font-bold">
                    {Math.round(weather.tempMin)}°
                  </span>{" "}
                  / 최고{" "}
                  <span className="text-base text-gray-700 font-bold">
                    {Math.round(weather.tempMax)}°
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  체감{" "}
                  <span className="text-base text-gray-700 font-bold">
                    {Math.round(weather.feelsLike)}°
                  </span>
                </p>
              </div>
            </div>
          )}

          {forecast && (
            <div>
              <h2>시간대별 날씨</h2>
              <ul>
                {forecast.hourlyTemps.map((item) => (
                  <li key={item.time}>
                    {item.time} : {item.temp}°C ({item.description})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h2>즐겨찾기 ({favorites.length}/6)</h2>
          {favorites.length === 0 ? (
            <p>즐겨찾기한 장소가 없습니다</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {favorites.map((favorite) => {
                return (
                  <FavoriteCard
                    key={favorite.id}
                    favorite={favorite}
                    onRemove={() => removeFavorite(favorite.id)}
                    onClick={handleFavoriteClick}
                    onUpdateNickname={updateNickname}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
