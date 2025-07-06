import React from "react";
import PokemonCard from "src/components/molecules/PokemonCard";
import LoadingSpinner from "src/components/atoms/LoadingSpinner";
import Card from "src/components/atoms/Card";
import Pagination from "src/components/molecules/Pagination";
import type { PokemonListItem } from "src/types/pokemon";

interface PokemonGridProps {
  pokemons: PokemonListItem[];
  loading: boolean;
  error: string | null;
  onPokemonClick: (name: string) => void;
  className?: string;
  // Pagination props
  currentPage: number;
  totalPages: number;
  totalCount: number;
  isSearching: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
}

// Helper function to extract ID from URL and generate sprite URL
const getPokemonIdFromUrl = (url: string): number => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
};

const getPokemonSpriteUrl = (url: string): string => {
  const id = getPokemonIdFromUrl(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, loading, error, onPokemonClick, className = "", currentPage, totalPages, totalCount, isSearching, onNextPage, onPreviousPage, onPageChange }) => {
  const POKEMON_PER_PAGE = 20;

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-64 ${className}`}>
        <LoadingSpinner size="lg" aria-label="Loading Pokémon list..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={`p-8 text-center ${className}`}>
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Pokémon</h3>
        <p className="text-gray-600">{error}</p>
      </Card>
    );
  }

  if (pokemons.length === 0) {
    return (
      <Card className={`p-8 text-center ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{isSearching ? "No Pokémon Found" : "No Pokémon Available"}</h3>
        <p className="text-gray-600">{isSearching ? "Try adjusting your search criteria." : "Please try again later."}</p>
      </Card>
    );
  }

  const startIndex = (currentPage - 1) * POKEMON_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * POKEMON_PER_PAGE, totalCount);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8" role="grid" aria-label="Pokémon list" aria-rowcount={Math.ceil(pokemons.length / 5)} aria-colcount={5}>
        {pokemons.map((pokemon, index) => (
          <div key={pokemon.name} role="gridcell" aria-rowindex={Math.floor(index / 5) + 1} aria-colindex={(index % 5) + 1}>
            <PokemonCard name={pokemon.name} imageUrl={getPokemonSpriteUrl(pokemon.url)} onClick={() => onPokemonClick(pokemon.name)} />
          </div>
        ))}
      </div>

      {/* Pagination Info - only when not searching */}
      {!isSearching && totalCount > 0 && (
        <div className="text-center text-gray-600 mb-4" aria-live="polite">
          Showing {startIndex} to {endIndex} of {totalCount} Pokémon
        </div>
      )}

      {/* Pagination - only when not searching */}
      {!isSearching && <Pagination currentPage={currentPage} totalPages={totalPages} hasNextPage={currentPage < totalPages} hasPreviousPage={currentPage > 1} onNextPage={onNextPage} onPreviousPage={onPreviousPage} onPageChange={onPageChange} />}
    </div>
  );
};

export default PokemonGrid;
