import { ForecastItem } from "./ForecastItem";
import { ForecastDataType } from "../types";

interface HourlyForecastProps {
  forecast: ForecastDataType;
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  return (
    <section className="overflow-hidden mt-4">
      <div className="overflow-x-auto pb-2" aria-label="시간별 예보">
        <ul className="flex w-max">
          {forecast.hourlyTemps.map((item, index) => (
            <ForecastItem key={index} item={item} isFirst={index === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
};
