import axios from 'axios';
import { QueryKey, useQuery } from 'react-query';
import { THROW_FAKE_ERROR } from '../config';
import { Pokemon, ResponseError } from './types';

export const usePokemonQuery = (queryKey: QueryKey) =>
  useQuery<Pokemon[], ResponseError>(
    queryKey,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (THROW_FAKE_ERROR) {
        throw new Error('Test error!');
      }
      return axios.get('https://pokeapi.co/api/v2/pokemon').then((result) => result.data.results);
    },
    {
      refetchOnWindowFocus: true, // Should/n't refetch data on window focus
      staleTime: 5000, // The time after which data will be refetched (Infinity possible)
      cacheTime: 3000, // The time, after which the data will be garbage collected (press hide to check) Infinity possible
    },
  );
