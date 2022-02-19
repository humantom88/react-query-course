import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from './queryKeys';
import { Post } from './types';

interface PostsQueryParameters {
  userId?: number;
}

export const usePostsQuery = (parameters?: PostsQueryParameters) => {
  const { userId = -1 } = parameters || {};
  const basePath = 'https://jsonplaceholder.typicode.com/posts';
  let queryString = basePath;

  if (userId > -1) {
    queryString = `${basePath}?userId=${userId}`;
  }

  const config = undefined;
  // {
  //   enabled: userId > -1,
  // };

  return useQuery<Post[]>(
    QueryKey.posts,
    () => axios.get(queryString).then((res) => res.data),
    config,
  );
};
