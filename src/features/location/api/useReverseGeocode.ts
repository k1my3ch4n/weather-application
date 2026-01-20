import { useQuery } from "@tanstack/react-query";
import { getAddressByCoords } from "@shared/api/kakao";
import { CoordinatesType } from "@/shared/types";

export const useReverseGeocode = (coords: CoordinatesType | null) => {
  return useQuery({
    queryKey: ["reverseGeocode", coords?.lat, coords?.lng],
    queryFn: () => getAddressByCoords(coords!.lat, coords!.lng),
    enabled: !!coords?.lat && !!coords?.lng,
  });
};
