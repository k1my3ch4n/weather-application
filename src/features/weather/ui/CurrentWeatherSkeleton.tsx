import { Skeleton } from "@shared/ui/Skeleton";

export const CurrentWeatherSkeleton = () => {
  return (
    <section role="status" aria-label="현재 날씨 로딩 중">
      <header className="flex items-center gap-2 mb-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-6 h-6 rounded-md" />
      </header>

      <div className="text-center">
        <Skeleton className="w-28 h-6 mx-auto mb-2" />
        <Skeleton className="w-24 h-24 mx-auto rounded-lg" />
        <Skeleton className="w-28 h-10 mx-auto mt-2" />
        <Skeleton className="w-40 h-4 mx-auto mt-2" />
      </div>
    </section>
  );
};
