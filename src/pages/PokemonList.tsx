import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PokemonGrid from "src/components/organisms/PokemonGrid";
import SearchBar from "src/components/molecules/SearchBar";
import { usePokemon } from "src/hooks/usePokemon";

const PokemonList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Get initial page from URL
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;

  const { pokemonList, loading, error, currentPage, totalPages, totalCount, isSearching, fetchByPage, searchPokemonByName, clearSearch } = usePokemon(initialPage);

  const handlePokemonClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    searchPokemonByName(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    clearSearch();
  };

  const handlePageChange = (page: number) => {
    if (!isSearching) {
      fetchByPage(page);
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set("page", page.toString());
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleNextPage = () => {
    if (!isSearching && currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!isSearching && currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokédex</h1>
            <p className="text-lg text-gray-600 mb-6">Discover and explore the world of Pokémon</p>
            <SearchBar value={searchTerm} onSearch={handleSearch} onClear={handleClearSearch} placeholder="Search Pokémon by full name..." className="max-w-md mx-auto" label="Search Pokémon by full name" />
          </header>

          <main id="main-content" role="main" aria-label="Pokémon list">
            <PokemonGrid pokemons={pokemonList} loading={loading} error={error} onPokemonClick={handlePokemonClick} currentPage={currentPage} totalPages={totalPages} totalCount={totalCount} isSearching={isSearching} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} onPageChange={handlePageChange} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
