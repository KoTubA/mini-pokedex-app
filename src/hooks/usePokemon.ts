import { useState, useEffect, useCallback } from "react";
import type { PokemonListItem, PokemonListResponse, PokemonDetailResponse } from "src/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_PER_PAGE = 20;

export const usePokemon = (initialPage: number = 1) => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  const fetchByPage = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      setIsSearching(false);
      setPokemonList([]);

      const offset = (pageNumber - 1) * POKEMON_PER_PAGE;

      // Fetch only the list
      const listResponse = await fetch(`${BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
      if (!listResponse.ok) {
        throw new Error(`Failed to fetch Pokémon list: ${listResponse.statusText}`);
      }

      const listData: PokemonListResponse = await listResponse.json();
      setTotalCount(listData.count);
      setPokemonList(listData.results);
      setCurrentPage(pageNumber);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokémon");
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPokemonByName = useCallback(
    async (name: string) => {
      if (!name.trim()) {
        // If search is empty, return to normal pagination
        setIsSearching(false);
        fetchByPage(1);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setIsSearching(true);
        setPokemonList([]);

        // Try to fetch exact Pokémon by name
        const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

        if (response.status === 404) {
          setPokemonList([]);
          setError("Pokémon not found");
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
        }

        const data: PokemonDetailResponse = await response.json();

        // Convert to PokemonListItem format for consistency
        const pokemonItem: PokemonListItem = {
          name: data.name,
          url: `${BASE_URL}/pokemon/${data.name}`,
        };

        setPokemonList([pokemonItem]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search Pokémon");
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchByPage]
  );

  const clearSearch = useCallback(() => {
    setIsSearching(false);
    setError(null);
    fetchByPage(1);
  }, [fetchByPage]);

  // Initial load with the specified page
  useEffect(() => {
    fetchByPage(initialPage);
  }, [fetchByPage, initialPage]);

  return {
    pokemonList,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    isSearching,
    fetchByPage,
    searchPokemonByName,
    clearSearch,
  };
};
