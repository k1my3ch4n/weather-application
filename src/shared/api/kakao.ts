import { clientApi } from "./instance/client";

interface CoordinatesType {
  lat: number;
  lng: number;
  addressName: string;
}

export const getCoordinatesByAddress = async (
  address: string,
): Promise<CoordinatesType> => {
  const { data } = await clientApi.get("/location", {
    params: { address },
  });

  return data;
};

export const getAddressByCoords = async (lat: number, lng: number) => {
  const { data } = await clientApi.get("/location/reverse", {
    params: { lat, lng },
  });

  return data;
};
