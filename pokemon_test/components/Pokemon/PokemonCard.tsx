"use client";

import { Card } from "@/components/ui/card";
import type { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  isFirst: boolean;
  onClick: () => void;
}

export function PokemonCard({
  pokemon,
  isSelected,
  isFirst,
  onClick,
}: PokemonCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected
          ? isFirst
            ? "ring-2 ring-blue-500 shadow-lg"
            : "ring-2 ring-red-500 shadow-lg"
          : ""
      }`}
    >
      <div className="p-4 text-center">
        <div className="relative w-full h-32 mb-2">
          <Image
            src={pokemon.image || "/placeholder.svg"}
            alt={pokemon.name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-semibold text-sm">{pokemon.name}</h3>
        <div className="flex gap-1 justify-center mt-2 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
