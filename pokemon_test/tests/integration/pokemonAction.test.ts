import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { getPokemons } from "@/actions/pokemons.action";
import { mockBulbasaurDetails } from "../mocks/mock.data";

describe("getPokemons Server Action", () => {
  it("should fetch and correctly transform the pokemon data on success", async () => {
    const pokemons = await getPokemons();
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toEqual({
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
    });
  });

  it("should throw an error if the initial pokemon list fetch fails", async () => {
    // Mock a server error for the initial fetch.
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    // Assert that the function throws the expected error.
    await expect(getPokemons()).rejects.toThrow("Failed to load Pokémon data");
  });

  it("should handle failures in fetching individual pokemon details", async () => {
    // Mock a scenario where one of the detail fetches fails.
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon", () => {
        return HttpResponse.json({
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
          ],
        });
      }),
      // Bulbasaur fetch is successful.
      http.get("https://pokeapi.co/api/v2/pokemon/1/", () => {
        return HttpResponse.json(mockBulbasaurDetails);
      }),
      // Charmander fetch fails with a server error.
      http.get("https://pokeapi.co/api/v2/pokemon/4/", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const pokemons = await getPokemons();

    // Assert that the failed fetch is filtered out and only the successful one is returned.
    expect(pokemons).toHaveLength(1);
    expect(pokemons[0].name).toBe("Bulbasaur");
  });

  it("should return an empty array if the Pokémon list is empty", async () => {
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon", () => {
        return HttpResponse.json({ results: [] });
      })
    );
    const pokemons = await getPokemons();
    expect(pokemons).toEqual([]);
  });
});
