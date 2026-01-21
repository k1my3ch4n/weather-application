import { useEffect, useMemo, useState } from "react";
import { useGeolocation } from "@shared/lib/hooks/useGeolocation";
import { useReverseGeocode } from "@features/location/api/useReverseGeocode";
import { useCoordinates } from "@features/location/api/useCoordinates";

export const useLocationState = () => {
  const [searchAddress, setSearchAddress] = useState<string | null>(null);

  const {
    lat,
    lng,
    isLoading: geoLoading,
    error: geoError,
    requestLocation,
  } = useGeolocation();

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

    return null;
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

  const noDisplayAddress =
    !searchAddress && !reverseData?.address && !!geoError;

  return {
    displayAddress,
    coords,
    coordinates,
    isLoading: isLocationLoading || coordsLoading,
    noDisplayAddress,
    handleLocationSelect,
    handleFavoriteClick,
  };
};
