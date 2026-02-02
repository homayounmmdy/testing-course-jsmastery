"use client";

import { Button } from "@/components/ui/button";

interface TypeFilterProps {
  types: string[];
  filterType: string;
  setFilterType: (type: string) => void;
}

export function TypeFilter({
  types,
  filterType,
  setFilterType,
}: TypeFilterProps) {
  const allTypes = ["All", ...types.sort()];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
      {allTypes.map((type) => (
        <Button
          key={type}
          onClick={() => setFilterType(type)}
          variant={filterType === type ? "default" : "outline"}
          size="sm"
          className="shrink-0"
        >
          {type}
        </Button>
      ))}
    </div>
  );
}
