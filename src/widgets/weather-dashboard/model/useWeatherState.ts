import { useWeather } from "@features/weather/api/useWeather";
import { useForecast } from "@features/weather/api/useForecast";
import { CoordinatesType } from "@shared/types";

interface UseWeatherDataParams {
  coordinates: CoordinatesType | null;
}

export const useWeatherData = ({ coordinates }: UseWeatherDataParams) => {
  const {
    data: weather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useWeather(coordinates);

  const {
    data: forecast,
    isLoading: forecastLoading,
    isError: forecastError,
  } = useForecast(coordinates);

  return {
    weather,
    forecast,
    isLoading: weatherLoading || forecastLoading,
    isError: weatherError || forecastError,
  };
};
