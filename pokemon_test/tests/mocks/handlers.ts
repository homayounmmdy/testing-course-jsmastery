import { http, HttpResponse } from "msw";
import {
  mockPokemonList,
  mockBulbasaurDetails,
  mockCharmanderDetails,
  mockPokemonTypes,
} from "./mock.data";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", () =>
    HttpResponse.json(mockPokemonList),
  ),
  http.get("https://pokeapi.co/api/v2/pokemon/1", () =>
    HttpResponse.json(mockBulbasaurDetails),
  ),
  http.get("https://pokeapi.co/api/v2/pokemon/4", () =>
    HttpResponse.json(mockCharmanderDetails),
  ),
  http.get("https://pokeapi.co/api/v2/type", () => {
    return HttpResponse.json(mockPokemonTypes);
  }),
  http.get("https://pokeapi.co/api/v2/type/:type", () => {
    return HttpResponse.json(mockCharmanderDetails);
  }),
];
