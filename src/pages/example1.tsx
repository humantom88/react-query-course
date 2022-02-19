import { useCallback, useState } from 'react';
import { PokemonSearch } from '../components/PokemonSearch';

export const Example1Page = () => {
  const [pokemon, setPokemon] = useState('');
  const handleChangeSearchPokemon = useCallback((ev) => setPokemon(ev.target.value), []);

  return (
    <div>
      <h1>Hello React Query</h1>
      <input
        value={pokemon}
        placeholder="For example: 'bulbasaur'"
        onChange={handleChangeSearchPokemon}
      />
      <PokemonSearch pokemon={pokemon} />
    </div>
  );
};
