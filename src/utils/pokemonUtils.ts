import type { Pokemon, PokemonDetailResponse } from "src/types/pokemon";

export const transformPokemonData = (data: PokemonDetailResponse): Pokemon => {
  const statsMap: { [key: string]: keyof Pokemon["stats"] } = {
    hp: "hp",
    attack: "attack",
    defense: "defense",
    "special-attack": "specialAttack",
    "special-defense": "specialDefense",
    speed: "speed",
  };

  const stats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

  data.stats.forEach((stat) => {
    const statName = statsMap[stat.stat.name];
    if (statName) {
      stats[statName] = stat.base_stat;
    }
  });

  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
    types: data.types.map((type) => type.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats,
  };
};
