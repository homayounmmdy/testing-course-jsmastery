"use client";
import { X } from "lucide-react";
import type { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface BattleArenaProps {
  selected1: Pokemon | null;
  selected2: Pokemon | null;
  onViewAnalysis: () => void;
  onClearSlot: (slot: 1 | 2) => void;
}

export function BattleArena({
  selected1,
  selected2,
  onViewAnalysis,
  onClearSlot,
}: BattleArenaProps) {
  return (
    <div className="w-full bg-linear-to-b from-primary/10 to-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              Battle Arena
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Epic Pokémon Showdown
            </p>
          </div>
          <button
            onClick={onViewAnalysis}
            disabled={!selected1 || !selected2}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Battle Analysis
          </button>
        </div>

        {/* Battle Arena Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Slot 1 */}
          {selected1 ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-card border border-border rounded-lg p-3 sm:p-4 relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-lg p-2 flex items-center justify-center shrink-0">
                <Image
                  src={selected1.image || "/placeholder.svg"}
                  alt={selected1.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-foreground capitalize text-sm sm:text-base truncate">
                  {selected1.name}
                </h3>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {selected1.types.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onClearSlot(1)}
                className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                title="Deselect"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-card border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center">
              <div>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">
                  Select First Pokémon
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Click a card below to start
                </p>
              </div>
            </div>
          )}

          {/* Slot 2 */}
          {selected2 ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-card border border-border rounded-lg p-3 sm:p-4 relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary/10 rounded-lg p-2 flex items-center justify-center shrink-0">
                <Image
                  src={selected2.image || "/placeholder.svg"}
                  alt={selected2.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-foreground capitalize text-sm sm:text-base truncate">
                  {selected2.name}
                </h3>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {selected2.types.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onClearSlot(2)}
                className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                title="Deselect"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-card border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center">
              <div>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">
                  Select Second Pokémon
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Click a card below to compare
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
