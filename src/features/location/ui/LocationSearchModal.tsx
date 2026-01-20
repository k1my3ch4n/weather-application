"use client";

import { useState } from "react";

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}

export const LocationSearchModal = ({
  isOpen,
  onClose,
  onSelect,
}: LocationSearchModalProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedAddress) {
      onSelect(selectedAddress);
      handleClose();
    }
  };

  const handleClose = () => {
    setSearchValue("");
    setSelectedAddress(null);
    onClose();
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedAddress(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">위치 검색</h2>

        <input
          type="text"
          value={searchValue}
          onChange={handleChangeLocation}
          placeholder="지역명을 입력하세요 (예: 강남구)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
  focus:ring-blue-500"
          autoFocus
        />

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedAddress}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300        
  disabled:cursor-not-allowed transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
