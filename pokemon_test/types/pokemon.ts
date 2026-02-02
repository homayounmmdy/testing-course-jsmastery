export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStats;
}

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonTypeResult {
  name: string;
  url: string;
}

export interface PokemonTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonTypeResult[];
}

export interface PokemonDetailType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailSprites {
  front_default: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
    };
  };
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  sprites: PokemonDetailSprites;
  types: PokemonDetailType[];
  stats: PokemonDetailStat[];
}

export interface TypePokemonEntry {
  is_main_series: boolean;
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface TypeDetailResponse {
  id: number;
  name: string;
  pokemon: TypePokemonEntry[];
}
