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
