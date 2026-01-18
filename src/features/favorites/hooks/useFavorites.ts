import { useState } from "react";

interface Favorite {
  id: string;
  lat: number;
  lng: number;
  addressName: string;
  nickname: string;
  createdAt: number;
}

interface AddFavoriteParams {
  lat: number;
  lng: number;
  addressName: string;
}

const LOCAL_STORAGE_KEY = "favorites";
const MAX_FAVORITES = 6;

const getInitialFavorites = (): Favorite[] => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// todo : 파일 내 alert 외부로 제거
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>(getInitialFavorites);

  const saveFavorites = (newFavorites: Favorite[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const addFavorite = (location: AddFavoriteParams) => {
    if (favorites.length >= MAX_FAVORITES) {
      alert("즐겨찾기는 최대 6개까지 가능합니다.");
      return;
    }

    const isDuplicate = favorites.some(
      (favorite) =>
        favorite.lat === location.lat && favorite.lng === location.lng,
    );

    if (isDuplicate) {
      alert("이미 즐겨찾기에 추가된 장소입니다.");
      return;
    }

    const newFavorite: Favorite = {
      id: crypto.randomUUID(),
      ...location,
      nickname: location.addressName,
      createdAt: Date.now(),
    };

    saveFavorites([...favorites, newFavorite]);
    return;
  };

  const removeFavorite = (id: string) => {
    const filteredFavorites = favorites.filter(
      (favorite) => favorite.id !== id,
    );

    saveFavorites(filteredFavorites);
  };

  const updateNickname = (id: string, nickname: string) => {
    const filteredFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, nickname } : fav,
    );

    saveFavorites(filteredFavorites);
  };

  const isFavorite = (lat: number, lng: number) => {
    return favorites.some((fav) => fav.lat === lat && fav.lng === lng);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    updateNickname,
    isFavorite,
    isFull: favorites.length >= MAX_FAVORITES,
  };
};
