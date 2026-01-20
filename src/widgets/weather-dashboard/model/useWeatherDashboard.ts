import { useMemo, useState } from "react";
import { useGeolocation } from "@shared/lib/hooks/useGeolocation";
import { useReverseGeocode } from "@features/location/api/useReverseGeocode";
import { useCoordinates } from "@features/location/api/useCoordinates";
import { useWeather } from "@features/weather/api/useWeather";
import { useForecast } from "@features/weather/api/useForecast";
import { useFavorites } from "@features/favorites/hooks/useFavorites";

const DEFAULT_ADDRESS = "서울특별시 강남구 역삼동";

export const useWeatherDashboard = () => {
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lat, lng, isLoading: geoLoading } = useGeolocation();

  const { data: reverseData } = useReverseGeocode(
    lat && lng ? { lat, lng } : null,
  );

  const displayAddress = useMemo(() => {
    if (searchAddress) {
      return searchAddress;
    }

    if (reverseData?.address) {
      return reverseData.address;
    }

    return DEFAULT_ADDRESS;
  }, [searchAddress, reverseData?.address]);

  const { data: coords, isLoading: coordsLoading } =
    useCoordinates(displayAddress);

  const coordinates = coords ? { lat: coords.lat, lng: coords.lng } : null;

  const { data: weather, isLoading: weatherLoading } = useWeather(coordinates);

  const { data: forecast, isLoading: forecastLoading } =
    useForecast(coordinates);

  const {
    favorites,
    addFavorite,
    removeFavorite,
    updateNickname,
    isFavorite,
    isFull,
  } = useFavorites();

  const isCurrentFavorite = coords ? isFavorite(coords.lat, coords.lng) : false;

  const isLoading =
    coordsLoading || weatherLoading || forecastLoading || geoLoading;

  const handleLocationSelect = (address: string) => {
    setSearchAddress(address);
  };

  const handleFavoriteClick = (nickname: string) => {
    setSearchAddress(nickname);
  };

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

  const handleRemoveCurrentFavorite = () => {
    if (!coords) {
      return;
    }

    const currentFavorite = favorites.find(
      (fav) => fav.lat === coords.lat && fav.lng === coords.lng,
    );

    if (currentFavorite) {
      removeFavorite(currentFavorite.id);
    }
  };

  return {
    displayAddress,
    weather,
    forecast,
    favorites,
    isModalOpen,
    isCurrentFavorite,
    isFull,
    isLoading,
    setIsModalOpen,
    handleLocationSelect,
    handleFavoriteClick,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  };
};
