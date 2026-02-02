import { render } from "@testing-library/react";
import BattleRadar from "@/components/Battle/BattleRadar";
import type { ReactNode } from "react";
import type { Pokemon } from "@/types/pokemon";
import { describe, it, expect, vi } from "vitest";

interface ContainerProps {
  children: ReactNode;
}

interface RadarChartProps {
  data: Pokemon[];
  children?: ReactNode;
}

interface RadarProps {
  name: string;
  dataKey: string;
  stroke?: string;
  fill?: string;
}

interface AngleAxisProps {
  dataKey: string;
}

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: ContainerProps) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  RadarChart: ({ data, children }: RadarChartProps) => (
    <div data-testid="radar-chart" data-chart-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  PolarGrid: () => <div data-testid="polar-grid" />,
  PolarAngleAxis: ({ dataKey }: AngleAxisProps) => (
    <div data-testid="polar-angle-axis" data-key={dataKey} />
  ),
  PolarRadiusAxis: () => <div data-testid="polar-radius-axis" />,
  Radar: ({ name, dataKey, stroke, fill }: RadarProps) => (
    <div
      data-testid={`radar-${name}`}
      data-key={dataKey}
      data-stroke={stroke}
      data-fill={fill}
    />
  ),
  Legend: () => <div data-testid="legend" />,
}));

const mockPokemon1: Pokemon = {
  id: 1,
  name: "Bulbasaur",
  image: "https://example.com/bulbasaur.png",
  types: ["grass", "poison"],
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    spAtk: 65,
    spDef: 65,
    speed: 45,
  },
};

const mockPokemon2: Pokemon = {
  id: 2,
  name: "Ivysaur",
  image: "https://example.com/ivysaur.png",
  types: ["grass", "poison"],
  stats: {
    hp: 60,
    attack: 62,
    defense: 63,
    spAtk: 80,
    spDef: 80,
    speed: 60,
  },
};

describe("BattleRadar Component", () => {
  it("should render radar chart with all components", () => {
    const { getByTestId } = render(
      <BattleRadar selected1={mockPokemon1} selected2={mockPokemon2} />,
    );

    expect(getByTestId("responsive-container")).toBeInTheDocument();
    expect(getByTestId("radar-chart")).toBeInTheDocument();
    expect(getByTestId("polar-grid")).toBeInTheDocument();
    expect(getByTestId("polar-angle-axis")).toBeInTheDocument();
    expect(getByTestId("polar-radius-axis")).toBeInTheDocument();
    expect(getByTestId("legend")).toBeInTheDocument();
  });

  it("should pass correct stat data to radar chart", () => {
    const { getByTestId } = render(
      <BattleRadar selected1={mockPokemon1} selected2={mockPokemon2} />,
    ); // Corrected import issue
    const radarChart = getByTestId("radar-chart");
    const chartData = JSON.parse(
      radarChart.getAttribute("data-chart-data") || "[]",
    );

    expect(chartData).toHaveLength(6); // 6 stats: HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
    expect(chartData[0]).toEqual({
      stat: "HP",
      Bulbasaur: 45,
      Ivysaur: 60,
    });
    expect(chartData[1]).toEqual({
      stat: "Attack",
      Bulbasaur: 49,
      Ivysaur: 62,
    });
  });

  it("should render with different Pokemon combinations", () => {
    const charmander: Pokemon = {
      id: 4,
      name: "Charmander",
      image: "https://example.com/charmander.png",
      types: ["fire"],
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        spAtk: 60,
        spDef: 50,
        speed: 65,
      },
    };

    const { getByTestId } = render(
      <BattleRadar selected1={mockPokemon1} selected2={charmander} />,
    );

    expect(getByTestId("radar-Bulbasaur")).toBeInTheDocument();
    expect(getByTestId("radar-Charmander")).toBeInTheDocument();
  });

  it("should handle Pokemon with same stats", () => {
    const identicalPokemon: Pokemon = {
      id: 1,
      name: "Bulbasaur",
      image: "https://example.com/bulbasaur.png",
      types: ["grass", "poison"],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spAtk: 65,
        spDef: 65,
        speed: 45,
      },
    };

    const { getByTestId } = render(
      <BattleRadar selected1={mockPokemon1} selected2={identicalPokemon} />,
    );

    expect(getByTestId("radar-chart")).toBeInTheDocument();
  });
});
