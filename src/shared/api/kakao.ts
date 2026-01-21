import { AddressCoordinatesType } from "../types";
import { clientApi } from "./instance/client";

export const getCoordinatesByAddress = async (
  address: string,
): Promise<AddressCoordinatesType> => {
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
