import axios from 'axios';
import { QueryClient, useQuery } from 'react-query';
import { QueryKey } from './queryKeys';
import { Post } from './types';

interface PostQueryParameters {
  postId?: number;
  queryClient: QueryClient;
}

export const usePostQuery = (parameters?: PostQueryParameters) => {
  const { postId = -1, queryClient } = parameters || {};
  const basePath = 'https://jsonplaceholder.typicode.com/posts';
  let queryString = basePath;

  if (postId) {
    queryString = `${basePath}/${postId}`;
  }

  return useQuery<Post>(QueryKey.post, () => axios.get(queryString).then((res) => res.data), {
    initialData: () =>
      queryClient?.getQueryData<Post[]>(QueryKey.posts)?.find(({ id }) => id === postId),
    enabled: postId > -1,
  });
};
