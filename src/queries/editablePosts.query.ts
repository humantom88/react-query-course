import axios from 'axios';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { HOSTNAME } from '../config';
import { QueryKey } from './queryKeys';

export const useEditablePostsQuery = () => {
  return useQuery(QueryKey.editablePosts, async () => {
    const response = await axios.get(`${HOSTNAME}/api/posts`);
    return response.data;
  });
};

export interface NewPostAttributes {
  title: string;
}

export const useCreatePostMutation = (queryClient: QueryClient) => {
  return useMutation(
    QueryKey.editablePosts,
    (values: NewPostAttributes) => axios.post(`${HOSTNAME}/api/posts`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.editablePosts);
      },
    },
  );
};
