"use client";

import { useState } from "react";
import { useCoordinates } from "@features/location/api/useCoordinates";
import { useWeather } from "@features/weather/api/useWeather";
import { useForecast } from "@features/weather/api/useForecast";
import { useFavorites } from "@features/favorites/hooks/useFavorites";
import { FavoriteCard } from "@features/favorites/ui/FavoriteCard";

export default function Home() {
  const [address, setAddress] = useState("서울특별시 강남구 역삼동");
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

  const { favorites, addFavorite, removeFavorite, isFavorite, isFull } =
    useFavorites();

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
      <h1>날씨 조회</h1>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div>
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
              <h2>현재 날씨</h2>
              <p>온도: {weather.temp}°C</p>
              <p>
                최저: {weather.tempMin}°C / 최고: {weather.tempMax}°C
              </p>
              <p>체감: {weather.feelsLike}°C</p>
              <p>날씨: {weather.description}</p>

              {isCurrentFavorite ? (
                <button onClick={handleRemoveCurrentFavorite}>
                  ⭐ 즐겨찾기 해제
                </button>
              ) : (
                <button onClick={handleAddFavorite} disabled={isFull}>
                  ☆ 즐겨찾기 추가 {isFull && "(최대 6개)"}
                </button>
              )}
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
