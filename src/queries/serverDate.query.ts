import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from './queryKeys';

interface ServerDate {
  time: string;
}

export const useServerDateQuery = () =>
  useQuery<ServerDate>(
    QueryKey.serverDate,
    () => {
      return axios.get('http://127.0.0.1:8125/api/serverDate').then((res) => res.data);
    },
    {
      refetchInterval: 1000, // Not running in background by default
      // refetchIntervalInBackground: true // Force background refetching
    },
  );
