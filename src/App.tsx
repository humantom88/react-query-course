import { useCallback, useReducer, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import { BerryList, MyPosts, PokemonList, PokemonListCount } from './components';
import { PokemonSearch } from './components/PokemonSearch';
import { QueryKey } from './queries/queryKeys';

function App() {
  const [shown, toggle] = useReducer((d) => !d, true);
  const [pokemon, setPokemon] = useState('');
  const handleChangeSearchPokemon = useCallback((ev) => setPokemon(ev.target.value), []);

  return (
    <div className="App">
      <h1>Hello React Query</h1>
      <input value={pokemon} onChange={handleChangeSearchPokemon} />
      <PokemonSearch pokemon={pokemon} />
      <hr />
      <button onClick={() => toggle()}>{shown ? 'Hide' : 'Show'}</button>
      {shown && <PokemonListCount queryKey={QueryKey.pokemon} />}
      {shown && <PokemonList queryKey={QueryKey.pokemon} />}
      {shown && <BerryList queryKey={QueryKey.berries} />}
      <hr />
      <MyPosts />
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
