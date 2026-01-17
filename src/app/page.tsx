"use client";

import { useState } from "react";
import { useCoordinates } from "@features/location/api/useCoordinates";

export default function Home() {
  const [address, setAddress] = useState("서울특별시 강남구 역삼동");
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

  const { data, isLoading, error } = useCoordinates(searchAddress);

  const handleSearch = () => {
    setSearchAddress(address);
  };

  return (
    <div>
      <h1>위치 좌표 조회</h1>

      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="지역명 입력"
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {isLoading && <p>로딩 중...</p>}

      {error && <p>{(error as Error).message}</p>}

      {data && (
        <div>
          <p>{data.addressName}</p>
          <p>위도: {data.lat}</p>
          <p>경도: {data.lng}</p>
        </div>
      )}
    </div>
  );
}
