import { getPokemons } from "@/actions/pokemons.action";
import PokemonMain from "@/components/Pokemon/PokemonMain";
import type { Pokemon } from "@/types/pokemon";

export default async function Home() {
  let pokemons: Pokemon[] = [];
  let error: string | null = null;

  try {
    pokemons = await getPokemons(20, 0);
  } catch (err: unknown) {
    const e = err as Error;
    error = e.message;
  }

  return (
    <div className="min-h-screen bg-background">
      {error && (
        <div className="flex items-center justify-center py-16">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      )}
      {!error && <PokemonMain initialPokemons={pokemons} />}
    </div>
  );
}
