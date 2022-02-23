import axios from 'axios';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { QueryKey } from './queryKeys';
import { Post } from './types';

interface PostsQueryParameters {
  userId?: number;
  queryClient?: QueryClient;
  callback?: React.DispatchWithoutAction;
}

export const usePostsQuery = (parameters?: PostsQueryParameters) => {
  const { userId, queryClient, callback } = parameters || {};
  const basePath = 'https://jsonplaceholder.typicode.com/posts';
  let queryString = basePath;

  if (userId) {
    queryString = `${basePath}?userId=${userId}`;
  }

  return useQuery<Post[]>(
    QueryKey.posts,
    async () => {
      const posts = await axios.get(queryString).then((res) => res.data);
      posts.forEach((post: Post) => {
        queryClient?.setQueryData([QueryKey.post, post.id], post);
      });

      return posts;
    },
    {
      ...(userId ? { enabled: userId > -1 } : {}),
      onSuccess: () => {
        if (callback) {
          callback();
        }
      },
      // cacheTime: 1000
    },
  );
};
