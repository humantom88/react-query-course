import { usePokemonSearchQuery } from '../queries';

interface PokemonSearchProps {
  pokemon: string;
}

export const PokemonSearch = ({ pokemon }: PokemonSearchProps) => {
  const queryInfo = usePokemonSearchQuery(pokemon);

  if (queryInfo.isLoading) {
    return <p>{'Loading Pokemon...'}</p>;
  }

  if (queryInfo.error) {
    return <p>{queryInfo.error.message}</p>;
  }

  return (
    <div>
      {queryInfo.isFetching ? <div>Updating...</div> : null}

      {queryInfo.data?.sprites ? (
        <img src={queryInfo.data?.sprites?.front_default} alt="pokemon" />
      ) : (
        'Pokemon not found'
      )}
      <br />
    </div>
  );
};
