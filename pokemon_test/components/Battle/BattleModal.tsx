"use client";
import { X, Zap, BarChart3 } from "lucide-react";
import PokemonRadar from "@/components/Battle/BattleRadar";
import { BattleWinner } from "@/components/Battle/BattleWinner";
import type { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface BattleModalProps {
  selected1: Pokemon | null;
  selected2: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BattleModal({
  selected1,
  selected2,
  isOpen,
  onClose,
}: BattleModalProps) {
  if (!isOpen || !selected1 || !selected2) return null;

  const winner = () => {
    const sum1 = Object.values(selected1.stats).reduce((a, b) => a + b, 0);
    const sum2 = Object.values(selected2.stats).reduce((a, b) => a + b, 0);
    if (sum1 === sum2) return { name: "It's a Tie!", isTie: true };
    return {
      name: sum1 > sum2 ? selected1.name : selected2.name,
      isTie: false,
    };
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-background border border-border rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
          <div className="sticky top-0 bg-linear-to-r from-primary via-accent to-secondary px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl z-20">
            <div className="min-w-0 flex items-center gap-3">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white shrink-0" />
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-white">
                  Battle Arena
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  Ultimate Stats Comparison
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
              {/* Pokemon 1 */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-blue-600/30 rounded-2xl blur-xl" />
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl border-3 border-blue-500 p-4 flex items-center justify-center shadow-lg">
                    <Image
                      src={selected1.image || "/placeholder.svg"}
                      alt={selected1.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl sm:text-3xl font-bold text-foreground capitalize mb-2 sm:mb-3">
                  {selected1.name}
                </h3>
                <div className="flex gap-2 flex-wrap justify-center mb-3 sm:mb-4">
                  {selected1.types.map((type) => (
                    <span
                      key={type}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full capitalize shadow-md"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="w-full bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 font-semibold">
                    Total Stats
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">
                    {Object.values(selected1.stats).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>

              {/* Pokemon 2 */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-linear-to-br from-red-500/30 to-red-600/30 rounded-2xl blur-xl" />
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 bg-linear-to-br from-red-50 to-red-100 rounded-2xl border-3 border-red-500 p-4 flex items-center justify-center shadow-lg">
                    <Image
                      src={selected2.image || "/placeholder.svg"}
                      alt={selected2.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl sm:text-3xl font-bold text-foreground capitalize mb-2 sm:mb-3">
                  {selected2.name}
                </h3>
                <div className="flex gap-2 flex-wrap justify-center mb-3 sm:mb-4">
                  {selected2.types.map((type) => (
                    <span
                      key={type}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-linear-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-semibold rounded-full capitalize shadow-md"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="w-full bg-red-50 rounded-lg p-3 sm:p-4 border border-red-200">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 font-semibold">
                    Total Stats
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600">
                    {Object.values(selected2.stats).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl border-2 border-slate-200 p-4 sm:p-8 mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700" />
                <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                  Stats Comparison
                </h3>
              </div>
              <PokemonRadar selected1={selected1} selected2={selected2} />
            </div>

            {/* Winner Section */}
            <div className="flex justify-center">
              <BattleWinner
                winnerName={winner()?.name || ""}
                isTie={winner()?.isTie || false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
