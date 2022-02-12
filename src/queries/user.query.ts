import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from './queryKeys';
import { User } from './types';

// user email: 'Sincere@april.biz'
// https://jsonplaceholder.typicode.com/users?email=${email}

const email = 'Sincere@april.biz';

export const useUserQuery = () => {
  return useQuery<User>(
    QueryKey.user,
    () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0]),
    {
      initialData: initialUser, // A placeholder, it'll skip isLoading state and update this by updatingFetch
      // initialStale: true, // If initialUser data is not full (commented below), then fetch it and merge results
    },
  );
};

// private

const initialUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  // address: {
  //   street: 'Kulas Light',
  //   suite: 'Apt. 556',
  //   city: 'Gwenborough',
  //   zipcode: '92998-3874',
  //   geo: {
  //     lat: '-37.3159',
  //     lng: '81.1496',
  //   },
  // },
  // phone: '1-770-736-8031 x56442',
  // website: 'hildegard.org',
  // company: {
  //   name: 'Romaguera-Crona',
  //   catchPhrase: 'Multi-layered client-server neural-net',
  //   bs: 'harness real-time e-markets',
  // },
};
