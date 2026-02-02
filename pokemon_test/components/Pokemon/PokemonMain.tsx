"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { PokemonCard } from "@/components/Pokemon/PokemonCard";
import { TypeFilter } from "@/components/Filter/TypeFilter";
import { BattleModal } from "@/components/Battle/BattleModal";
import { BattleArena } from "@/components/Battle/BattleArena";
import { Spinner } from "@/components/ui/spinner";
import { PokemonCardSkeleton } from "@/components/Skeleton/PokemonCardSkeleton";
import { TypeFilterSkeleton } from "@/components/Skeleton/TypeFilterSkeleton";
import { useToast } from "@/hooks/use-toast";
import type { Pokemon } from "@/types/pokemon";
import {
  getPokemons,
  getPokemonsByTypePaginated,
  getPokemonTypeCount,
  getTotalPokemonCount,
  getAllPokemonTypes,
} from "@/actions/pokemons.action";

type Props = {
  initialPokemons: Pokemon[];
};

export default function PokemonMain({ initialPokemons }: Props) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [selected1, setSelected1] = useState<Pokemon | null>(null);
  const [selected2, setSelected2] = useState<Pokemon | null>(null);
  const [filterType, setFilterType] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(20);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const POKEMON_LIMIT = 20;

  useEffect(() => {
    const loadTypes = async () => {
      try {
        setIsLoadingTypes(true);
        const types = await getAllPokemonTypes();
        setAllTypes(types);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load Pokemon types. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingTypes(false);
      }
    };
    loadTypes();
  }, [toast]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          await loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasMore, filterType, offset]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      let newPokemons: Pokemon[] = [];

      if (filterType === "All") {
        newPokemons = await getPokemons(POKEMON_LIMIT, offset);
        const totalCount = await getTotalPokemonCount();
        setHasMore(offset + POKEMON_LIMIT < totalCount);
      } else {
        newPokemons = await getPokemonsByTypePaginated(
          filterType.toLowerCase(),
          POKEMON_LIMIT,
          offset,
        );
        const typeCount = await getPokemonTypeCount(filterType.toLowerCase());
        setHasMore(offset + POKEMON_LIMIT < typeCount);
      }

      if (newPokemons.length > 0) {
        setPokemons((prev) => [...prev, ...newPokemons]);
        setOffset((prev) => prev + POKEMON_LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load more Pokemon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, filterType, offset, toast]);

  const handleFilterChange = useCallback(
    async (type: string) => {
      setFilterType(type);
      setOffset(0);
      setIsLoading(true);
      setHasMore(true);

      try {
        let newPokemons: Pokemon[] = [];

        if (type === "All") {
          newPokemons = await getPokemons(POKEMON_LIMIT, 0);
          const totalCount = await getTotalPokemonCount();
          setHasMore(POKEMON_LIMIT < totalCount);
        } else {
          newPokemons = await getPokemonsByTypePaginated(
            type.toLowerCase(),
            POKEMON_LIMIT,
            0,
          );
          const typeCount = await getPokemonTypeCount(type.toLowerCase());
          setHasMore(POKEMON_LIMIT < typeCount);
        }

        setPokemons(newPokemons);
        setOffset(POKEMON_LIMIT);
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to filter Pokemon by ${type}. Please try again.`,
          variant: "destructive",
        });
        setFilterType("All");
      } finally {
        setIsLoading(false);
      }
    },
    [toast],
  );

  const handlePokemonClick = (pokemon: Pokemon) => {
    if (selected1?.id === pokemon.id) {
      setSelected1(null);
      return;
    }
    if (selected2?.id === pokemon.id) {
      setSelected2(null);
      return;
    }

    if (!selected1) {
      setSelected1(pokemon);
      return;
    }

    if (!selected2) {
      setSelected2(pokemon);
      return;
    }

    setSelected2(pokemon);
  };

  const handleClearSlot = (slot: 1 | 2) => {
    if (slot === 1) {
      setSelected1(null);
    } else {
      setSelected2(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        <BattleArena
          selected1={selected1}
          selected2={selected2}
          onViewAnalysis={() => setIsModalOpen(true)}
          onClearSlot={handleClearSlot}
        />

        {/* Pokemon Selection Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Select Pokémon
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Choose two Pokémon to compare their stats and battle
            </p>
            {isLoadingTypes ? (
              <TypeFilterSkeleton />
            ) : (
              <TypeFilter
                types={allTypes}
                filterType={filterType}
                setFilterType={handleFilterChange}
              />
            )}
          </div>

          {/* Pokémon Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {pokemons.map((p) => {
              const isSelected =
                selected1?.id === p.id || selected2?.id === p.id;
              const isFirst = selected1?.id === p.id;
              return (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  isSelected={isSelected}
                  isFirst={isFirst}
                  onClick={() => handlePokemonClick(p)}
                />
              );
            })}
            {isLoading &&
              Array.from({ length: POKEMON_LIMIT }).map((_, i) => (
                <PokemonCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          <div ref={observerTarget} className="flex justify-center py-8">
            {isLoading && <Spinner />}
          </div>

          {pokemons.length === 0 && !isLoading && (
            <div className="flex items-center justify-center py-16">
              <p className="text-muted-foreground text-lg">
                No Pokémon found for this type
              </p>
            </div>
          )}

          {!hasMore && pokemons.length > 0 && (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground text-sm">
                No more Pokémon to load
              </p>
            </div>
          )}
        </div>
      </main>

      <BattleModal
        selected1={selected1}
        selected2={selected2}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
