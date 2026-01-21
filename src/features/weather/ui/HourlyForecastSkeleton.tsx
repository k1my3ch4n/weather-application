import { Skeleton } from "@shared/ui/Skeleton";

export const HourlyForecastSkeleton = () => {
  return (
    <section
      className="overflow-hidden mt-4"
      role="status"
      aria-label="시간별 예보 로딩 중"
    >
      <div className="overflow-x-auto pb-2">
        <ul className="flex w-max">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="flex-shrink-0 text-center px-4">
              <Skeleton className="w-8 h-3 mx-auto mb-1" />
              <Skeleton className="w-10 h-4 mx-auto" />
              <Skeleton className="w-12 h-12 mx-auto mt-1 rounded-lg" />
              <Skeleton className="w-8 h-6 mx-auto mt-1" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
