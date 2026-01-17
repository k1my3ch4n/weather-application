import { useQuery } from "@tanstack/react-query";
import { getCoordinatesByAddress } from "@shared/api/kakao";

export const useCoordinates = (address: string | null) => {
  return useQuery({
    queryKey: ["coordinates", address],
    queryFn: () => getCoordinatesByAddress(address!),
    enabled: !!address,
  });
};
