"use client";

import { useEffect, useMemo, useState } from "react";
import { useCoordinates } from "@features/location/api/useCoordinates";
import { useWeather } from "@features/weather/api/useWeather";
import { useForecast } from "@features/weather/api/useForecast";
import { useFavorites } from "@features/favorites/hooks/useFavorites";
import { CurrentWeather } from "@features/weather/ui/CurrentWeather";
import { HourlyForecast } from "@features/weather/ui/HourlyForecast";
import { FavoriteList } from "@features/favorites/ui/FavoriteList";
import { LocationSearchModal } from "@features/location/ui/LocationSearchModal";
import { useGeolocation } from "@shared/lib/hooks/useGeolocation";
import { useReverseGeocode } from "@features/location/api/useReverseGeocode";

const DEFAULT_ADDRESS = "서울특별시 강남구 역삼동";

export default function Home() {
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

  const { lat, lng, isLoading: geoLoading, requestLocation } = useGeolocation();

  const { data: reverseData, isLoading: reverseLoading } = useReverseGeocode(
    lat && lng ? { lat, lng } : null,
  );

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const displayAddress = useMemo(() => {
    if (searchAddress) {
      return searchAddress;
    }

    if (reverseData?.address) {
      return reverseData.address;
    }

    return DEFAULT_ADDRESS;
  }, [searchAddress, reverseData?.address]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocationSelect = (address: string) => {
    setSearchAddress(address);
  };

  const {
    favorites,
    addFavorite,
    removeFavorite,
    updateNickname,
    isFavorite,
    isFull,
  } = useFavorites();

  const { data: coords, isLoading: coordsLoading } =
    useCoordinates(displayAddress);

  const { data: weather, isLoading: weatherLoading } = useWeather(
    coords ? { lat: coords.lat, lng: coords.lng } : null,
  );

  const { data: forecast, isLoading: forecastLoading } = useForecast(
    coords ? { lat: coords.lat, lng: coords.lng } : null,
  );

  const handleAddFavorite = () => {
    if (!coords || !displayAddress) {
      return;
    }

    addFavorite({
      lat: coords.lat,
      lng: coords.lng,
      addressName: displayAddress,
    });
  };

  const handleFavoriteClick = (nickname: string) => {
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

  // todo : 추후 스켈레톤 추가 예정
  // const isLoading = coordsLoading || weatherLoading || forecastLoading;

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
}
