"use client";

import { Trophy, Handshake } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BattleWinnerProps {
  winnerName: string;
  isTie: boolean;
}

export function BattleWinner({ winnerName, isTie }: BattleWinnerProps) {
  return (
    <Card className="w-full max-w-md p-8 text-center bg-linear-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg">
      <div className="mb-4 flex justify-center">
        {isTie ? (
          <Handshake className="w-16 h-16 text-yellow-600" />
        ) : (
          <Trophy className="w-16 h-16 text-yellow-600 animate-bounce" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-700">
        {isTie ? "Perfectly Matched!" : "Battle Winner"}
      </h3>
      <p
        className={`text-5xl font-black capitalize tracking-tight ${
          isTie ? "text-yellow-600" : "text-green-600"
        }`}
      >
        {winnerName}
      </p>
      {!isTie && (
        <p className="text-sm text-slate-600 mt-4 font-medium">
          Victory achieved with superior stats!
        </p>
      )}
    </Card>
  );
}
