import axios from "axios";

interface CoordinatesType {
  lat: number;
  lng: number;
  addressName: string;
}

// todo : axios 인스턴스 분리
const clientApi = axios.create({
  baseURL: "/api",
});

export const getCoordinatesByAddress = async (
  address: string
): Promise<CoordinatesType> => {
  const { data } = await clientApi.get("/location", {
    params: { address },
  });

  return data;
};
