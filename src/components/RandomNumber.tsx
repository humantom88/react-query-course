import { useCallback, useReducer } from 'react';
import { useQueryClient } from 'react-query';
import { QueryKey } from '../queries/queryKeys';
import { useRandomNumberQuery } from '../queries/random.query';

export const RandomNumber = () => {
  const [show, toggle] = useReducer((d) => !d, true);

  const queryClient = useQueryClient();

  const handleClickToggleRandom = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleClickInvalidateRandom = useCallback(() => {
    queryClient.invalidateQueries(QueryKey.randomNumber);
  }, [queryClient]);

  const handleClickInvalidateRandomByKey = (subKey: string) => () => {
    queryClient.invalidateQueries([QueryKey.randomNumber, subKey]);
  };

  return (
    <div>
      <button onClick={handleClickToggleRandom}>Toggle Random</button>
      <button onClick={handleClickInvalidateRandomByKey('A')}>Invalidate Random A</button>
      <button onClick={handleClickInvalidateRandomByKey('B')}>Invalidate Random B</button>
      <button onClick={handleClickInvalidateRandomByKey('C')}>Invalidate Random C</button>
      <button onClick={handleClickInvalidateRandom}>Invalidate Random</button>
      {show ? (
        <>
          <RandomNumberComponent subKey="A" />
          <RandomNumberComponent subKey="B" />
          <RandomNumberComponent subKey="C" />
        </>
      ) : null}
    </div>
  );
};

const RandomNumberComponent = ({ subKey }: { subKey: string }) => {
  const randomNumberQuery = useRandomNumberQuery({ subKey });

  return (
    <div>
      <h1>Random Number {randomNumberQuery.isFetching && '...'}</h1>
      {/* {randomNumberQuery.isFetching && '...'} */}
      <p>{randomNumberQuery.isLoading && 'Loading time...'}</p>
      <p>{Math.round(Number(randomNumberQuery.data?.value))}</p>
    </div>
  );
};
