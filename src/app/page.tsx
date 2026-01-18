"use client";

import { useState } from "react";
import { useCoordinates } from "@features/location/api/useCoordinates";
import { useWeather } from "@features/weather/api/useWeather";
import { useForecast } from "@features/weather/api/useForecast";

export default function Home() {
  const [address, setAddress] = useState("서울특별시 강남구 역삼동");
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

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

  const isLoading = coordsLoading || weatherLoading || forecastLoading;

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

      {weather && (
        <div>
          <h2>현재 날씨</h2>
          <p>온도: {weather.temp}°C</p>
          <p>
            최저: {weather.tempMin}°C / 최고: {weather.tempMax}°C
          </p>
          <p>체감: {weather.feelsLike}°C</p>
          <p>날씨: {weather.description}</p>
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
  );
}
