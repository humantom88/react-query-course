import { useQuery } from 'react-query';
import { ResponseError } from './types';

interface PokemonSearchResponseData {
  sprites: { front_default: string };
}

interface CancelablePromise extends Promise<any> {
  cancel: () => void;
}

export const usePokemonSearchQuery = (pokemon: string) =>
  useQuery<PokemonSearchResponseData, ResponseError>(
    ['pokemon', pokemon],
    () => {
      // Using Fetch Example
      const controller = new AbortController();
      const { signal } = controller;
      const promise = new Promise((resolve) => setTimeout(resolve, 1000))
        .then(() => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
            method: 'GET',
            signal,
          });
        })
        .then((res) => res.json()) as CancelablePromise;

      promise.cancel = () => {
        controller.abort();
      };

      return promise;

      // Using Axios Example (#1 below)
    },
    {
      retry: 1, // Number of retries if the request failed, by default 3 times

      // Number of milliseconds between retries,
      // by default the exponential back off turn on.
      // We may pass the function here, like (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000 /* maxDelay, after retry stops */)
      // To turn off retry, pass -> false
      retryDelay: 1000,
      enabled: !!pokemon, // Condition which controls whether to start fetching or not
    },
  );

// #1 Using Axios Example
// const source = axios.CancelToken.source();
// const promise = new Promise((resolve) => setTimeout(resolve, 1000))
//   .then(() => {
//     return axios
//       .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { cancelToken: source.token })
//       .then((result) => result.data);
//   })
//   .then((res) => res.data) as CancelablePromise;

// promise.cancel = () => {
//   source.cancel();
// };

// return promise;
