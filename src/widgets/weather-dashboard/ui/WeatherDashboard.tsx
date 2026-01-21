"use client";

import { CurrentWeather } from "@features/weather/ui/CurrentWeather";
import { HourlyForecast } from "@features/weather/ui/HourlyForecast";
import { FavoriteList } from "@features/favorites/ui/FavoriteList";
import { LocationSearchModal } from "@features/location/ui/LocationSearchModal";
import { useWeatherDashboard } from "../model/useWeatherDashboard";
import { CurrentWeatherSkeleton } from "@features/weather/ui/CurrentWeatherSkeleton";
import { HourlyForecastSkeleton } from "@features/weather/ui/HourlyForecastSkeleton";
import { EmptyLocation } from "@/features/location/ui/EmptyLocation";

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
          <EmptyLocation onSearchClick={() => setIsModalOpen(true)} />
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
