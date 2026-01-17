import axios from "axios";

// todo : axios 인스턴스 분리
const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: process.env.NEXT_PUBLIC_OWM_API_KEY,
    units: "metric",
    lang: "kr",
  },
});

interface WeatherDataType {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
}

// todo : 위도 경도 단위 통일 - lng vs lon
export const getWeatherByCoords = async (
  lat: number,
  lng: number
): Promise<WeatherDataType> => {
  const { data } = await weatherApi.get("/weather", {
    params: { lat, lon: lng },
  });

  const main = data?.main;
  const weather = data?.weather?.[0];

  if (!main || !weather) {
    throw new Error("날씨 데이터를 불러올 수 없습니다");
  }

  return {
    temp: main.temp,
    feelsLike: main.feels_like,
    humidity: main.humidity,
    description: weather.description,
  };
};
