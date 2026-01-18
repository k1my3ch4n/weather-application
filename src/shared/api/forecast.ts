import { clientApi } from "./instance/client";

// todo : 타입 중복 제거
interface HourlyTemp {
  time: string;
  temp: number;
  description: string;
}

interface ForecastDataType {
  hourlyTemps: HourlyTemp[];
}

export const getForecastByCoords = async (
  lat: number,
  lng: number,
): Promise<ForecastDataType> => {
  const { data } = await clientApi.get("/forecast", {
    params: { lat, lng },
  });
  return data;
};
