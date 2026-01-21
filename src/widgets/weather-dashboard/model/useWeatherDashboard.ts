import { useState } from "react";
import { useLocationState } from "./useLocationState";
import { useWeatherState } from "./useWeatherState";
import { useFavoriteState } from "./useFavoriteState";

export const useWeatherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    displayAddress,
    coords,
    coordinates,
    isLoading: locationLoading,
    noDisplayAddress,
    handleLocationSelect,
    handleFavoriteClick,
  } = useLocationState();

  const {
    weather,
    forecast,
    isLoading: weatherLoading,
    isError,
  } = useWeatherState({ coordinates });

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
    noDisplayAddress,
    setIsModalOpen,
    handleLocationSelect,
    handleFavoriteClick,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  };
};
