"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface Props {
  page: number | undefined | string;
  isNext: boolean;
  containerClasses?: string;
}

function Pagination({ page = 1, isNext, containerClasses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Navigation logic for handling page changes
  const handleNavigation = (type: "prev" | "next") => {
    const nextPageNumber =
      type === "prev" ? Number(page) - 1 : Number(page) + 1;
    const value = nextPageNumber > 1 ? nextPageNumber.toString() : null;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value,
    });

    router.push(newUrl);
  };

  // If there's no next page and we're on the first page, don't render
  if (!isNext && Number(page) === 1) return null;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2",
        containerClasses
      )}
    >
      {/* Render "Prev" button only if needed */}
      {Number(page) > 1 && (
        <Button
          onClick={() => handleNavigation("prev")}
          className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
        >
          <p className="body-medium text-dark200_light800">Prev</p>
        </Button>
      )}

      <div className="bg-primary-500 flex items-center justify-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light-900">{page}</p>
      </div>

      {/* Render "Next" button only if there's a next page */}
      {isNext && (
        <Button
          onClick={() => handleNavigation("next")}
          className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
        >
          <p className="body-medium text-dark200_light800">Next</p>
        </Button>
      )}
    </div>
  );
}

export default Pagination;
