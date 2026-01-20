"use client";

import { CurrentWeather } from "@features/weather/ui/CurrentWeather";
import { HourlyForecast } from "@features/weather/ui/HourlyForecast";
import { FavoriteList } from "@features/favorites/ui/FavoriteList";
import { LocationSearchModal } from "@features/location/ui/LocationSearchModal";
import { useWeatherDashboard } from "../model/useWeatherDashboard";

export const WeatherDashboard = () => {
  const {
    displayAddress,
    weather,
    forecast,
    favorites,
    isModalOpen,
    isCurrentFavorite,
    isFull,
    setIsModalOpen,
    handleLocationSelect,
    handleFavoriteClick,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  } = useWeatherDashboard();

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        {weather && displayAddress && (
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
      </div>

      <FavoriteList
        favorites={favorites}
        onRemove={removeFavorite}
        onClick={handleFavoriteClick}
        onUpdateNickname={updateNickname}
      />

      <LocationSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleLocationSelect}
      />
    </div>
  );
};
