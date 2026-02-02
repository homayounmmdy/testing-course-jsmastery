import { describe, it, expect } from "vitest";

describe("Battle Calculations", () => {
  const calculateTotalStats = (stats: Record<string, number>) => {
    return Object.values(stats).reduce((a, b) => a + b, 0);
  };

  it("should calculate total stats correctly", () => {
    const stats = {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
    };

    const total = calculateTotalStats(stats);
    expect(total).toBe(318);
  });

  it("should determine winner based on total stats", () => {
    const stats1 = {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
    };

    const stats2 = {
      hp: 60,
      attack: 62,
      defense: 63,
      spAtk: 80,
      spDef: 80,
      speed: 60,
    };

    const total1 = calculateTotalStats(stats1);
    const total2 = calculateTotalStats(stats2);

    expect(total2 > total1).toBe(true);
  });

  it("should detect tie when stats are equal", () => {
    const stats1 = {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
    };

    const stats2 = {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
    };

    const total1 = calculateTotalStats(stats1);
    const total2 = calculateTotalStats(stats2);

    expect(total1 === total2).toBe(true);
  });
});
