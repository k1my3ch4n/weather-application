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
    <section aria-labelledby="favorites-title" className="border-t pt-4">
      <h2 id="favorites-title" className="text-lg font-bold">
        즐겨찾기{" "}
        <span className="text-base font-normal">
          ( {favorites.length} / 6 )
        </span>
      </h2>
      {favorites.length === 0 ? (
        <p role="status">즐겨찾기한 장소가 없습니다</p>
      ) : (
        <ul
          aria-label="즐겨찾기 목록"
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <FavoriteCard
                favorite={favorite}
                onRemove={() => onRemove(favorite.id)}
                onClick={onClick}
                onUpdateNickname={onUpdateNickname}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
