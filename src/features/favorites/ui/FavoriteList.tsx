"use client";

import { FavoriteCard } from "./FavoriteCard";
import { FavoriteType } from "../types";

interface FavoriteListProps {
  favorites: FavoriteType[];
  onRemove: (id: string) => void;
  onClick: (nickname: string) => void;
  onUpdateNickname: (id: string, nickname: string) => void;
}

export const FavoriteList = ({
  favorites,
  onRemove,
  onClick,
  onUpdateNickname,
}: FavoriteListProps) => {
  return (
    <div className="border-t pt-4">
      <h2>즐겨찾기 ({favorites.length}/6)</h2>
      {favorites.length === 0 ? (
        <p>즐겨찾기한 장소가 없습니다</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              onRemove={() => onRemove(favorite.id)}
              onClick={onClick}
              onUpdateNickname={onUpdateNickname}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
