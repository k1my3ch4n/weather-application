import { useMemo } from "react";
import { useFavorites } from "@features/favorites/hooks/useFavorites";
import { CoordinatesType } from "@shared/types";

interface UseFavoriteStateParams {
  coords: CoordinatesType | undefined;
  displayAddress: string | null;
}

export const useFavoriteState = ({
  coords,
  displayAddress,
}: UseFavoriteStateParams) => {
  const {
    favorites,
    addFavorite,
    removeFavorite,
    updateNickname,
    isFavorite,
    isFull,
  } = useFavorites();

  const isCurrentFavorite = useMemo(
    () => (coords ? isFavorite(coords.lat, coords.lng) : false),
    [coords, isFavorite],
  );

  const handleAddFavorite = () => {
    if (!coords || !displayAddress) return;

    addFavorite({
      lat: coords.lat,
      lng: coords.lng,
      addressName: displayAddress,
    });
  };

  const handleRemoveCurrentFavorite = () => {
    if (!coords) return;

    const currentFavorite = favorites.find(
      (fav) => fav.lat === coords.lat && fav.lng === coords.lng,
    );

    if (currentFavorite) {
      removeFavorite(currentFavorite.id);
    }
  };

  return {
    favorites,
    isCurrentFavorite,
    isFull,
    handleAddFavorite,
    handleRemoveCurrentFavorite,
    removeFavorite,
    updateNickname,
  };
};
