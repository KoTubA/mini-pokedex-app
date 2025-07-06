import React, { useState } from "react";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch, onClear, placeholder = "Search Pokémon...", className = "", label = "Search Pokémon" }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={className}>
      <label htmlFor="pokemon-search" className="sr-only">
        {label}
      </label>
      <div className="relative flex">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input id="pokemon-search" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholder} aria-label={label} role="searchbox" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          {inputValue && (
            <button onClick={handleClear} className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-2 flex items-center" aria-label="Clear search">
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Search">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
