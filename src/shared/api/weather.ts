import { clientApi } from "./instance/client";

interface WeatherDataType {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
}

export const getWeatherByCoords = async (
  lat: number,
  lng: number
): Promise<WeatherDataType> => {
  const { data } = await clientApi.get("/weather", {
    params: { lat, lng },
  });
  return data;
};
