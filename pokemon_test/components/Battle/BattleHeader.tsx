"use client";
import { Swords, Sparkles } from "lucide-react";

export function BattleHeader() {
  return (
    <div className="w-full bg-linear-to-b from-primary/5 to-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 bg-linear-to-br from-primary/10 to-secondary/10 rounded-full border-2 border-primary/30 flex items-center justify-center">
              <Swords className="w-10 h-10 sm:w-14 sm:h-14 text-primary" />
            </div>
          </div>

          {/* Text */}
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            Ready for Battle?
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-md">
            Select two Pokémon to compare their stats and discover who would win
            in an epic battle!
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl">
            <div className="flex flex-col items-center p-4 sm:p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3 font-bold text-primary text-lg sm:text-xl">
                1
              </div>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                Select First
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Choose your first Pokémon
              </p>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3 font-bold text-primary text-lg sm:text-xl">
                2
              </div>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                Select Second
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Choose your opponent
              </p>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3 font-bold text-primary text-lg sm:text-xl">
                3
              </div>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                View Analysis
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                See the battle results
              </p>
            </div>
          </div>

          {/* Hint */}
          <div className="mt-8 sm:mt-10 flex items-center gap-2 text-primary text-sm sm:text-base">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <p>Scroll down to start selecting Pokémon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
