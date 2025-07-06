import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "src/components/atoms/Card";
import Button from "src/components/atoms/Button";
import LoadingSpinner from "src/components/atoms/LoadingSpinner";
import { usePokemonDetail } from "src/hooks/usePokemonDetail";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetail(name);

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" aria-label="Loading Pokémon details..." />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || "Pokémon not found"}</p>
          <Button onClick={handleBackClick} aria-label="Go back to Pokémon list">
            Back to List
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-6" aria-label="Navigation">
            <Button onClick={handleBackClick} variant="outline" size="sm" aria-label="Go back to Pokémon list">
              ← Back to List
            </Button>
          </nav>

          <main role="main" aria-label={`${pokemon.name} details`}>
            <Card className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <section aria-labelledby="pokemon-name">
                  <div className="text-center">
                    <img src={pokemon.imageUrl} alt={`${pokemon.name} official artwork`} className="w-64 h-64 mx-auto object-contain" />
                    <h1 id="pokemon-name" className="text-3xl font-bold text-gray-900 mt-4 capitalize">
                      {pokemon.name}
                    </h1>
                    <div className="flex justify-center gap-2 mt-2" role="list" aria-label="Pokémon types">
                      {pokemon.types.map((type) => (
                        <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize" role="listitem">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Details Section */}
                <section aria-labelledby="pokemon-details">
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h2 id="pokemon-details" className="text-xl font-semibold text-gray-900 mb-3">
                        Basic Information
                      </h2>
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-gray-600">Height</dt>
                          <dd className="font-medium">{pokemon.height / 10}m</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-600">Weight</dt>
                          <dd className="font-medium">{pokemon.weight / 10}kg</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Abilities */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Abilities</h3>
                      <div className="flex flex-wrap gap-2" role="list" aria-label="Pokémon abilities">
                        {pokemon.abilities.map((ability) => (
                          <span key={ability} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize" role="listitem">
                            {ability}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Base Stats</h3>
                      <div className="space-y-3" role="list" aria-label="Pokémon base stats">
                        {Object.entries(pokemon.stats).map(([stat, value]) => (
                          <div key={stat} role="listitem">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="capitalize">{stat}</span>
                              <span className="font-medium">{value}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={255} aria-label={`${stat} stat: ${value} out of 255`}>
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(value / 255) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
