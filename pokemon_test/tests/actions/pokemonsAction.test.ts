// __tests__/getPokemons.test.ts
import { getPokemons } from "@/actions/pokemons.action";
import type { Pokemon } from "@/types/pokemon";
import { describe, expect, it, vi, afterEach } from "vitest";

// Mock fetch globally
globalThis.fetch = vi.fn() as unknown as typeof fetch;

function mockFetchResponse<T>(data: T): Response {
  return {
    ok: true,
    json: async () => data,
  } as Response;
}

describe("getPokemons server action", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch a list of Pokémon with details", async () => {
    // Mock list response
    (fetch as unknown as vi.Mock)
      .mockResolvedValueOnce(
        mockFetchResponse({
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
            { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
          ],
        }),
      )
      .mockResolvedValueOnce(
        mockFetchResponse({
          sprites: {
            other: { "official-artwork": { front_default: "bulba.png" } },
            front_default: "bulba_fallback.png",
          },
          types: [{ type: { name: "grass" } }],
          stats: [45, 49, 49, 65, 65, 45].map((v) => ({ base_stat: v })),
        }),
      )
      .mockResolvedValueOnce(
        mockFetchResponse({
          sprites: {
            other: { "official-artwork": { front_default: "char.png" } },
            front_default: "char_fallback.png",
          },
          types: [{ type: { name: "fire" } }],
          stats: [39, 52, 43, 60, 50, 65].map((v) => ({ base_stat: v })),
        }),
      );

    const pokemons: Pokemon[] = await getPokemons();

    expect(pokemons).toHaveLength(2);

    expect(pokemons[0]).toMatchObject({
      name: "Bulbasaur",
      image: "bulba.png",
      types: ["grass"],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spAtk: 65,
        spDef: 65,
        speed: 45,
      },
    });

    expect(pokemons[1]).toMatchObject({
      name: "Charmander",
      types: ["fire"],
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        spAtk: 60,
        spDef: 50,
        speed: 65,
      },
    });
  });

  it("should skip Pokémon if detail fetch fails", async () => {
    (fetch as vi.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
          ],
        }),
      } as Response)
      // Detail fetch fails
      .mockRejectedValueOnce(new Error("Detail fetch failed"));

    const pokemons: Pokemon[] = await getPokemons();

    // Failed Pokémon should be filtered out
    expect(pokemons).toHaveLength(0);
  });

  it("should throw if initial fetch fails", async () => {
    (fetch as vi.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(getPokemons()).rejects.toThrow("Failed to load Pokémon data");
  });
});
