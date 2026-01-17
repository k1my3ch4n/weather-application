import { clientApi } from "./instance/client";

interface CoordinatesType {
  lat: number;
  lng: number;
  addressName: string;
}

export const getCoordinatesByAddress = async (
  address: string
): Promise<CoordinatesType> => {
  const { data } = await clientApi.get("/location", {
    params: { address },
  });

  return data;
};
