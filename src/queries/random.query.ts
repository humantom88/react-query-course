import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from './queryKeys';

interface RandomNumber {
  value: string;
}

export const useRandomNumberQuery = ({ subKey }: { subKey: string }) =>
  useQuery<RandomNumber>(
    [QueryKey.randomNumber, subKey],
    () => {
      return axios.get('').then((res) => res.data);
    },
    {
      staleTime: Infinity, // Will not refetch on focus/blur page
    },
  );
