import { useQuery } from "@tanstack/react-query";
import { getWeatherByCoords } from "@shared/api/weather";

interface Coords {
  lat: number;
  lng: number;
}

export const useWeather = (coords: Coords | null) => {
  return useQuery({
    queryKey: ["weather", coords?.lat, coords?.lng],
    queryFn: () => getWeatherByCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
  });
};
