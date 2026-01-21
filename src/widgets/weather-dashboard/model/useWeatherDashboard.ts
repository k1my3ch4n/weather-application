import { useState } from "react";
import { useLocationState } from "./useLocationState";
import { useWeatherData } from "./useWeatherState";
import { useFavoriteState } from "./useFavoriteState";

export const useWeatherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    displayAddress,
    coords,
    coordinates,
    isLoading: locationLoading,
    handleLocationSelect,
    handleFavoriteClick,
  } = useLocationState();

  const {
    weather,
    forecast,
    isLoading: weatherLoading,
    isError,
  } = useWeatherData({ coordinates });

  const {
    favorites,
    isCurrentFavorite,
    isFull,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  } = useFavoriteState({ coords, displayAddress });

  return {
    displayAddress,
    weather,
    forecast,
    favorites,
    isModalOpen,
    isCurrentFavorite,
    isFull,
    isError,
    isLoading: locationLoading || weatherLoading,
    setIsModalOpen,
    handleLocationSelect,
    handleFavoriteClick,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  };
};
