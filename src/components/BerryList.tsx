import { QueryKey } from 'react-query';
import { useBerryQuery } from '../queries';
import { Berry } from '../queries/types';

interface BerryListProps {
  queryKey: QueryKey;
}

// Using the same queryKey in several components causes single fetch for all of them
export const BerryList = ({ queryKey }: BerryListProps) => {
  const queryInfo = useBerryQuery(queryKey);

  return (
    <div>
      {queryInfo.isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {queryInfo.data?.map(({ name, link }: Berry) => (
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
