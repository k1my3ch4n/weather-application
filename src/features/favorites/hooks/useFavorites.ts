import { useSyncExternalStore } from "react";
import { AddFavoriteParams, FavoriteType } from "../types";

const LOCAL_STORAGE_KEY = "favorites";
const MAX_FAVORITES = 6;

let cachedFavorites: FavoriteType[] = [];
let cachedString = "";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (): FavoriteType[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";

    if (saved !== cachedString) {
      cachedString = saved;
      cachedFavorites = JSON.parse(saved);
    }

    return cachedFavorites;
  } catch {
    return cachedFavorites;
  }
};

const emptyArray: FavoriteType[] = [];

const getServerSnapshot = (): FavoriteType[] => {
  return emptyArray;
};

const saveFavorites = (newFavorites: FavoriteType[]) => {
  const newString = JSON.stringify(newFavorites);

  cachedString = newString;
  cachedFavorites = newFavorites;

  localStorage.setItem(LOCAL_STORAGE_KEY, newString);
  window.dispatchEvent(new Event("storage"));
};

// todo : 파일 내 alert 외부로 제거
export const useFavorites = () => {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

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

    const newFavorite: FavoriteType = {
      id: crypto.randomUUID(),
      ...location,
      nickname: location.addressName,
      createdAt: Date.now(),
    };

    saveFavorites([...favorites, newFavorite]);
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
