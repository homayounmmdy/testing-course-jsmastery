import { Skeleton } from "@/components/ui/skeleton";

export function TypeFilterSkeleton() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-20 rounded shrink-0" />
      ))}
    </div>
  );
}
