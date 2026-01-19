export interface HourlyTempType {
  time: string;
  date: string | null;
  temp: number;
  description: string;
  icon: string;
}

export interface ForecastDataType {
  hourlyTemps: HourlyTempType[];
}

export interface WeatherDataType {
  temp: number;
  feelsLike: number;
  icon: string;
  description: string;
  tempMin: number;
  tempMax: number;
}
