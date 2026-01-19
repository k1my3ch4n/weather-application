import { useQuery } from "@tanstack/react-query";
import { getForecastByCoords } from "@shared/api/forecast";
import { CoordinatesType } from "@shared/types";

export const useForecast = (coords: CoordinatesType | null) => {
  return useQuery({
    queryKey: ["forecast", coords?.lat, coords?.lng],
    queryFn: () => getForecastByCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
  });
};
