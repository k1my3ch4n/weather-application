"use client";

import { useState } from "react";
import { useCoordinates } from "@features/location/api/useCoordinates";
import { useWeather } from "@/features/weather/api/useWeather";

export default function Home() {
  const [address, setAddress] = useState("서울특별시 강남구 역삼동");
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

  const { data: coords, isLoading: coordsLoading } =
    useCoordinates(searchAddress);
  const { data: weather, isLoading: weatherLoading } = useWeather(
    coords ? { lat: coords.lat, lng: coords.lng } : null
  );

  const handleSearch = () => {
    setSearchAddress(address);
  };

  const isLoading = coordsLoading || weatherLoading;

  return (
    <div>
      <h1>날씨 조회</h1>

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

      {coords && (
        <div>
          <p>{coords.addressName}</p>
          <p>
            위도: {coords.lat} / 경도: {coords.lng}
          </p>
        </div>
      )}

      {weather && (
        <div>
          <p>온도: {weather.temp}°C</p>
          <p>체감: {weather.feelsLike}°C</p>
          <p>습도: {weather.humidity}%</p>
          <p>날씨: {weather.description}</p>
        </div>
      )}
    </div>
  );
}
