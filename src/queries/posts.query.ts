import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from './queryKeys';
import { Post } from './types';

export const usePostsQuery = (userId?: number) => {
  return useQuery<Post[]>(
    QueryKey.posts,
    () =>
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
    {
      enabled: !!userId,
    },
  );
};
