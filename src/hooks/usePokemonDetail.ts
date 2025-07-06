import { useState, useEffect, useCallback } from "react";
import type { Pokemon, PokemonDetailResponse } from "src/types/pokemon";
import { transformPokemonData } from "src/utils/pokemonUtils";

const BASE_URL = "https://pokeapi.co/api/v2";

export const usePokemonDetail = (name: string | undefined) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonDetails = useCallback(async (pokemonName: string) => {
    try {
      setLoading(true);
      setError(null);
      setPokemon(null);

      const response = await fetch(`${BASE_URL}/pokemon/${pokemonName.toLowerCase()}`);

      if (response.status === 404) {
        setError("Pokémon not found");
        setPokemon(null);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon details: ${response.statusText}`);
      }

      const data: PokemonDetailResponse = await response.json();
      const transformedData = transformPokemonData(data);
      setPokemon(transformedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokémon details");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name);
    } else {
      setLoading(false);
      setError(null);
      setPokemon(null);
    }
  }, [name, fetchPokemonDetails]);

  const refetch = useCallback(() => {
    if (name) {
      fetchPokemonDetails(name);
    }
  }, [name, fetchPokemonDetails]);

  return {
    pokemon,
    loading,
    error,
    refetch,
  };
};
