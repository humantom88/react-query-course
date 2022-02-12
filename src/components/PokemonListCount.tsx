import { QueryKey } from 'react-query';
import { usePokemonQuery } from '../queries/pokemon.query';

interface PokemonListCountProps {
  queryKey: QueryKey;
}

export const PokemonListCount = ({ queryKey }: PokemonListCountProps) => {
  const queryInfo = usePokemonQuery(queryKey);
  return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>;
};
