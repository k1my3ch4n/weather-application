import { ForecastItem } from "./ForecastItem";
import { ForecastDataType } from "../types";
import { useEffect, useRef, useState } from "react";

interface HourlyForecastProps {
  forecast: ForecastDataType;
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [leftFade, setLeftFade] = useState(false);
  const [rightFade, setRightFade] = useState(true);

  useEffect(() => {
    const scroll = scrollRef.current;

    if (!scroll) {
      return;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scroll;

      setLeftFade(scrollLeft > 0);
      setRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    };

    handleScroll();

    scroll.addEventListener("scroll", handleScroll);
    return () => scroll.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden mt-4">
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2"
        aria-label="시간별 예보"
      >
        <ul className="flex w-max">
          {forecast.hourlyTemps.map((item, index) => (
            <ForecastItem key={index} item={item} isFirst={index === 0} />
          ))}
        </ul>
      </div>

      {leftFade && (
        <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-99" />
      )}

      {rightFade && (
        <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-99" />
      )}
    </section>
  );
};
