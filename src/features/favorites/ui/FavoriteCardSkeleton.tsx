import { Skeleton } from "@shared/ui/Skeleton";

export const FavoriteCardSkeleton = () => {
  return (
    <div
      className="rounded-xl p-3 bg-white shadow-lg"
      role="status"
      aria-label="날씨 정보 로딩 중"
    >
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-24 h-5" />
      </div>

      <div className="text-center">
        <Skeleton className="w-16 h-16 mx-auto rounded-lg" />
        <Skeleton className="w-20 h-8 mx-auto mt-2" />
        <Skeleton className="w-32 h-4 mx-auto mt-2" />
      </div>
    </div>
  );
};
