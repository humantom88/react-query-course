import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { HOSTNAME } from '../config';
import { PostQueryParameters } from './post.query';
import { QueryKey } from './queryKeys';
import { Post } from './types';

export const useEditablePostsQuery = () => {
  return useQuery(QueryKey.editablePosts, async () => {
    const response = await axios.get(`${HOSTNAME}/api/posts`);
    return response.data;
  });
};

export const useEditablePostQuery = (params: PostQueryParameters) => {
  const { postId, queryClient } = params;
  return useQuery<Post>(QueryKey.editablePost, () => axios.get(`${HOSTNAME}/api/posts/${postId}`), {
    initialData: () =>
      queryClient?.getQueryData<Post[]>(QueryKey.posts)?.find(({ id }) => id === Number(postId)),
    enabled: !!postId,
    staleTime: 0,
  });
};

export interface NewPostAttributes {
  title: string;
}

export interface EditPostAttributes extends NewPostAttributes {
  id: number;
}

interface PostError {
  message: string;
}
interface Response {
  data: Post[];
}

export const useCreatePostMutation = (queryClient: QueryClient) => {
  return useMutation<Response, AxiosError<PostError>, NewPostAttributes, Response>(
    QueryKey.editablePosts,
    (values: NewPostAttributes) => axios.post(`${HOSTNAME}/api/posts`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.editablePosts);
      },
      onError: (error) => {
        console.log(error, error.response);
      },
      onSettled: () => {
        queryClient.invalidateQueries(QueryKey.editablePosts);
      },
    },
  );
};

export const useEditPostMutation = (values: EditPostAttributes, queryClient: QueryClient) => {
  return useMutation<Response, AxiosError<PostError>, EditPostAttributes, Response>(
    QueryKey.editablePosts,
    (values: EditPostAttributes) => axios.post(`${HOSTNAME}/api/posts`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.editablePosts);
      },
      onError: (error) => {
        console.log(error, error.response);
      },
      onSettled: () => {
        // console.log('Whatever happens');
      },
    },
  );
};
