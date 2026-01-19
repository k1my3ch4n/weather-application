import { WeatherDataType } from "@features/weather/types";
import { clientApi } from "./instance/client";

export const getWeatherByCoords = async (
  lat: number,
  lng: number,
): Promise<WeatherDataType> => {
  const { data } = await clientApi.get("/weather", {
    params: { lat, lng },
  });
  return data;
};
