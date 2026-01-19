"use client";

import { useState } from "react";
import { IconButton } from "@shared/ui/IconButton";
import { useWeather } from "@features/weather/api/useWeather";

// todo : 타입 중복 제거
interface Favorite {
  id: string;
  lat: number;
  lng: number;
  addressName: string;
  nickname: string;
  createdAt: number;
}

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
  onClick: (nickname: string) => void;
  onUpdateNickname: (id: string, nickname: string) => void;
}

export const FavoriteCard = ({
  favorite,
  onRemove,
  onClick,
  onUpdateNickname,
}: FavoriteCardProps) => {
  const { id, lat, lng, addressName, nickname } = favorite;

  const { data: weather, isLoading } = useWeather({ lat, lng });

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(nickname);

  const handleUpdateNickname = () => {
    if (editValue.trim()) {
      onUpdateNickname(id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(nickname);
    setIsEditing(false);
  };

  return (
    <div
      className="rounded-xl p-3 bg-white shadow-lg hover:shadow-xl transition-shadow"
      onClick={() => onClick(addressName)}
    >
      <div className="flex items-center mb-2">
        <div className="flex items-center gap-1">
          <IconButton
            icon="⭐"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            variant="transparent"
            size="lg"
            title="즐겨찾기 해제"
          />

          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="px-2 py-1 text-sm border rounded text-black"
                autoFocus
              />
              <IconButton
                icon="✓"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateNickname();
                }}
                variant="success"
                title="저장"
              />
              <IconButton
                icon="✕"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                variant="danger"
                title="취소"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <h3 className="font-semibold truncate leading-none">
                {nickname}
              </h3>
              <IconButton
                icon="✎"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                variant="neutral"
                size="sm"
                title="별명 수정"
              />
            </div>
          )}
        </div>
      </div>

      {isLoading && <p className="text-gray-400 text-sm">날씨 불러오는 중..</p>}

      {weather && (
        <div className="text-center">
          <p className="text-3xl font-bold">{Math.round(weather.temp)}°C</p>
          <p className="text-md mt-1">{weather.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            최저{" "}
            <span className="text-sm text-gray-700 font-bold">
              {Math.round(weather.tempMin)}°
            </span>{" "}
            / 최고{" "}
            <span className="text-sm text-gray-700 font-bold">
              {Math.round(weather.tempMax)}°
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
