"use client";

import { CurrentWeather } from "@features/weather/ui/CurrentWeather";
import { HourlyForecast } from "@features/weather/ui/HourlyForecast";
import { FavoriteList } from "@features/favorites/ui/FavoriteList";
import { LocationSearchModal } from "@features/location/ui/LocationSearchModal";
import { useWeatherDashboard } from "../model/useWeatherDashboard";
import { CurrentWeatherSkeleton } from "@features/weather/ui/CurrentWeatherSkeleton";
import { HourlyForecastSkeleton } from "@features/weather/ui/HourlyForecastSkeleton";

export const WeatherDashboard = () => {
  const {
    displayAddress,
    weather,
    forecast,
    favorites,
    isModalOpen,
    isCurrentFavorite,
    isFull,
    isLoading,
    noDisplayAddress,
    setIsModalOpen,
    handleLocationSelect,
    handleFavoriteClick,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  } = useWeatherDashboard();

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto md:p-6 lg:p-8">
      <section className="mb-6">
        {isLoading && (
          <>
            <CurrentWeatherSkeleton />
            <HourlyForecastSkeleton />
          </>
        )}

        {!isLoading && noDisplayAddress && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 mb-4">
              위치 정보를 가져올 수 없어 해당 장소의 날씨 정보가 제공되지
              않습니다.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              위치 검색하기
            </button>
          </div>
        )}

        {!isLoading && weather && displayAddress && (
          <CurrentWeather
            addressName={displayAddress}
            weather={weather}
            isFavorite={isCurrentFavorite}
            isFull={isFull}
            onAddFavorite={handleAddFavorite}
            onRemoveCurrentFavorite={handleRemoveCurrentFavorite}
            onSearchClick={() => setIsModalOpen(true)}
          />
        )}

        {forecast && <HourlyForecast forecast={forecast} />}
      </section>

      <aside aria-label="즐겨찾기 위치">
        <FavoriteList
          favorites={favorites}
          onRemove={removeFavorite}
          onClick={handleFavoriteClick}
          onUpdateNickname={updateNickname}
        />
      </aside>

      <LocationSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleLocationSelect}
      />
    </div>
  );
};
