import { clientApi } from "./instance/client";

interface WeatherDataType {
  temp: number;
  feelsLike: number;
  description: string;
  tempMin: number;
  tempMax: number;
}

export const getWeatherByCoords = async (
  lat: number,
  lng: number,
): Promise<WeatherDataType> => {
  const { data } = await clientApi.get("/weather", {
    params: { lat, lng },
  });
  return data;
};
