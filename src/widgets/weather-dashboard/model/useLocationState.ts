import { useEffect, useMemo, useState } from "react";
import { useGeolocation } from "@shared/lib/hooks/useGeolocation";
import { useReverseGeocode } from "@features/location/api/useReverseGeocode";
import { useCoordinates } from "@features/location/api/useCoordinates";

const DEFAULT_ADDRESS = "서울특별시 강남구 역삼동";

export const useLocationState = () => {
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

  const { lat, lng, isLoading: geoLoading, requestLocation } = useGeolocation();

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const { data: reverseData, isLoading: reverseLoading } = useReverseGeocode(
    lat && lng ? { lat, lng } : null,
  );

  const displayAddress = useMemo(() => {
    if (searchAddress) {
      return searchAddress;
    }

    if (reverseData?.address) {
      return reverseData.address;
    }

    return DEFAULT_ADDRESS;
  }, [searchAddress, reverseData?.address]);

  const { data: coords, isLoading: coordsLoading } =
    useCoordinates(displayAddress);

  const coordinates = coords ? { lat: coords.lat, lng: coords.lng } : null;

  const handleLocationSelect = (address: string) => {
    setSearchAddress(address);
  };

  const handleFavoriteClick = (nickname: string) => {
    setSearchAddress(nickname);
  };

  const isLocationLoading = !searchAddress && (geoLoading || reverseLoading);

  return {
    displayAddress,
    coords,
    coordinates,
    isLoading: isLocationLoading || coordsLoading,
    handleLocationSelect,
    handleFavoriteClick,
  };
};
