import { useReducer } from 'react';
import { BerryList, PokemonList, PokemonListCount } from '../components';
import { QueryKey } from '../queries/queryKeys';

export const Example2Page = () => {
  const [shown, toggle] = useReducer((d) => !d, true);
  return (
    <div>
      <h2>Example2</h2>
      <button onClick={() => toggle()}>{shown ? 'Hide' : 'Show'}</button>
      {shown && <PokemonListCount queryKey={QueryKey.pokemon} />}
      {shown && <PokemonList queryKey={QueryKey.pokemon} />}
      {shown && <BerryList queryKey={QueryKey.berries} />}
    </div>
  );
};
