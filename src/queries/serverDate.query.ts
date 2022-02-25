import axios from 'axios';
import { useQuery } from 'react-query';
import { HOSTNAME } from '../config';
import { QueryKey } from './queryKeys';

interface ServerDate {
  time: string;
}

export const useServerDateQuery = () =>
  useQuery<ServerDate>(
    QueryKey.serverDate,
    () => {
      return axios.get(`${HOSTNAME}/api/serverDate`).then((res) => res.data);
    },
    {
      refetchInterval: 1000, // Not running in background by default
      // refetchIntervalInBackground: true // Force background refetching
    },
  );
