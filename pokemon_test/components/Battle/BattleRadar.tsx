"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Pokemon } from "@/types/pokemon";

interface BattleRadarProps {
  selected1: Pokemon;
  selected2: Pokemon;
}

export default function PokemonRadar({
  selected1,
  selected2,
}: BattleRadarProps) {
  const data = [
    {
      stat: "HP",
      [selected1.name]: selected1.stats.hp,
      [selected2.name]: selected2.stats.hp,
    },
    {
      stat: "Attack",
      [selected1.name]: selected1.stats.attack,
      [selected2.name]: selected2.stats.attack,
    },
    {
      stat: "Defense",
      [selected1.name]: selected1.stats.defense,
      [selected2.name]: selected2.stats.defense,
    },
    {
      stat: "Sp. Atk",
      [selected1.name]: selected1.stats.spAtk,
      [selected2.name]: selected2.stats.spAtk,
    },
    {
      stat: "Sp. Def",
      [selected1.name]: selected1.stats.spDef,
      [selected2.name]: selected2.stats.spDef,
    },
    {
      stat: "Speed",
      [selected1.name]: selected1.stats.speed,
      [selected2.name]: selected2.stats.speed,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <PolarRadiusAxis />
        <Radar
          name={selected1.name}
          dataKey={selected1.name}
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
        <Radar
          name={selected2.name}
          dataKey={selected2.name}
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
