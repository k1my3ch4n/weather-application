import { useQuery } from "@tanstack/react-query";
import { getForecastByCoords } from "@/shared/api/forecast";

// todo : 타입 중복 제거
interface Coords {
  lat: number;
  lng: number;
}

export const useForecast = (coords: Coords | null) => {
  return useQuery({
    queryKey: ["forecast", coords?.lat, coords?.lng],
    queryFn: () => getForecastByCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
  });
};
