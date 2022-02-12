import { QueryKey } from 'react-query';
import { usePokemonQuery } from '../queries/pokemon.query';
import { Pokemon } from '../queries/types';

interface PokemonListProps {
  queryKey: QueryKey;
}

// Using the same queryKey in several components causes single fetch for all of them
export const PokemonList = ({ queryKey }: PokemonListProps) => {
  const queryInfo = usePokemonQuery(queryKey);

  return (
    <div>
      {queryInfo.isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {queryInfo.data?.map(({ name, link }: Pokemon) => (
            <li key={name}>
              <a href={link}>{name}</a>
            </li>
          ))}
          {queryInfo.isFetching && <li>Updating...</li>}
        </ul>
      )}
      {queryInfo.error && <span>{queryInfo.error.message}</span>}
    </div>
  );
};
