import axios from "axios";

interface CoordinatesType {
  lat: number;
  lng: number;
  addressName: string;
}

// todo : axios 인스턴스 분리
const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
  },
});

export const getCoordinatesByAddress = async (
  address: string
): Promise<CoordinatesType> => {
  const { data } = await kakaoApi.get("/search/address.json", {
    params: { query: address },
  });

  if (data.documents.length === 0) {
    throw new Error("검색 결과가 없습니다");
  }

  const doc = data.documents[0];

  return {
    lat: parseFloat(doc.y),
    lng: parseFloat(doc.x),
    addressName: doc.address_name,
  };
};
