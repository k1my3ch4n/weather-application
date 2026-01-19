import { useQuery } from "@tanstack/react-query";
import { getWeatherByCoords } from "@shared/api/weather";
import { CoordinatesType } from "@shared/types";

export const useWeather = (coords: CoordinatesType | null) => {
  return useQuery({
    queryKey: ["weather", coords?.lat, coords?.lng],
    queryFn: () => getWeatherByCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
  });
};
