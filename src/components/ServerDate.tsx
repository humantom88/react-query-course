import { useServerDateQuery } from '../queries/serverDate.query';

export const ServerDate = () => {
  const dateQuery = useServerDateQuery();
  return (
    <div>
      <h1>Server Date</h1>
      {/* {dateQuery.isFetching && '...'} */}
      <p>{dateQuery.isLoading && 'Loading time...'}</p>
      <p>{dateQuery.data?.time}</p>
    </div>
  );
};
