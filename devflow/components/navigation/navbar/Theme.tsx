"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/constants";
import { cn } from "@/lib/utils";

const Theme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200"
      >
        <div>
          <Image
            src="/icons/sun.svg"
            alt="sun"
            width={20}
            height={20}
            className="active-theme block dark:hidden"
          />
          <Image
            src="/icons/moon.svg"
            alt="moon"
            width={20}
            height={20}
            className="active-theme hidden dark:block"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dark:border-dark-400 dark:bg-dark-300 absolute -right-12 mt-3 min-w-[120px] rounded border py-2">
        {themes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="dark:focus:bg-dark-400 flex items-center gap-4 px-2.5 py-2"
            onClick={() => setTheme(item.value)}
          >
            <Image
              src={item.icon}
              alt={item.value}
              width={16}
              height={16}
              className={cn(theme === item.value && "active-theme")}
            />

            <p
              className={cn(
                theme === item.value
                  ? "text-primary-500"
                  : "text-dark100_light900",
                "body-semibold"
              )}
            >
              {item.label}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;
