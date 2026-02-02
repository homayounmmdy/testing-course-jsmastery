import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PokemonCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="text-center">
        <Skeleton className="w-full h-32 mb-2 rounded" />
        <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
        <div className="flex gap-1 justify-center mt-2">
          <Skeleton className="h-6 w-12 rounded" />
          <Skeleton className="h-6 w-12 rounded" />
        </div>
      </div>
    </Card>
  );
}
