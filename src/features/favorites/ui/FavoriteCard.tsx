"use client";

import { useState } from "react";
import { IconButton } from "@shared/ui/IconButton";
import { useWeather } from "@features/weather/api/useWeather";
import { InfoLabel } from "@shared/ui/InfoLabel";
import { WeatherIcon } from "@shared/ui/WeatherIcon";
import { FavoriteType } from "../types";

interface FavoriteCardProps {
  favorite: FavoriteType;
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

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleSummit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateNickname();
  };

  return (
    <article
      className="rounded-xl p-3 bg-white shadow-lg hover:shadow-xl transition-shadow"
      role="button"
      onClick={() => onClick(addressName)}
      aria-label={`${nickname} 날씨 정보 보기`}
    >
      <header className="flex items-center mb-2">
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
            <form className="flex items-center gap-1" onSubmit={handleSummit}>
              <input
                id={`${nickname}-${id}`}
                type="text"
                value={editValue}
                onChange={handleChangeNickname}
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
            </form>
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
      </header>

      {isLoading && (
        <p role="status" className="text-gray-400 text-sm">
          날씨 불러오는 중..
        </p>
      )}

      {weather && (
        <section aria-label={`${nickname} 날씨`} className="text-center">
          <WeatherIcon icon={weather.icon} description={weather.description} />
          <p className="text-3xl font-bold">{Math.round(weather.temp)}°C</p>
          <p className="text-xs text-gray-500 mt-1">
            <InfoLabel
              label="최저"
              value={`${Math.round(weather.tempMin)}°`}
              size="sm"
            />
            {" / "}
            <InfoLabel
              label="최고"
              value={`${Math.round(weather.tempMax)}°`}
              size="sm"
            />
          </p>
        </section>
      )}
    </article>
  );
};
