export const mockPokemonList = {
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
  ],
};

export const mockBulbasaurDetails = {
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/bulbasaur.png",
      },
    },
    front_default: "https://example.com/bulbasaur-small.png",
  },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
};

export const mockCharmanderDetails = {
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/charmander.png",
      },
    },
    front_default: "https://example.com/charmander-small.png",
  },
  types: [{ type: { name: "fire" } }],
  stats: [
    { base_stat: 39, stat: { name: "hp" } },
    { base_stat: 52, stat: { name: "attack" } },
    { base_stat: 43, stat: { name: "defense" } },
    { base_stat: 60, stat: { name: "special-attack" } },
    { base_stat: 50, stat: { name: "special-defense" } },
    { base_stat: 65, stat: { name: "speed" } },
  ],
};

export const mockPokemonTypes = {
  results: [
    { name: "normal" },
    { name: "fire" },
    { name: "water" },
    { name: "electric" },
    { name: "grass" },
    { name: "ice" },
    { name: "fighting" },
    { name: "poison" },
    { name: "ground" },
    { name: "flying" },
    { name: "psychic" },
    { name: "bug" },
    { name: "rock" },
    { name: "ghost" },
    { name: "dragon" },
    { name: "dark" },
    { name: "steel" },
    { name: "fairy" },
  ],
};
