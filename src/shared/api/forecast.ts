import { ForecastDataType } from "@features/weather/types";
import { clientApi } from "./instance/client";

export const getForecastByCoords = async (
  lat: number,
  lng: number,
): Promise<ForecastDataType> => {
  const { data } = await clientApi.get("/forecast", {
    params: { lat, lng },
  });
  return data;
};
