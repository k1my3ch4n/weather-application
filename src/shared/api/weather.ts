import axios from "axios";

interface WeatherDataType {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
}

// todo : axios 인스턴스 분리
const clientApi = axios.create({
  baseURL: "/api",
});

export const getWeatherByCoords = async (
  lat: number,
  lng: number
): Promise<WeatherDataType> => {
  const { data } = await clientApi.get("/weather", {
    params: { lat, lng },
  });
  return data;
};
