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
  return useMutation<Post[], AxiosError<PostError>, NewPostAttributes, Post[]>(
    QueryKey.editablePosts,
    (values: NewPostAttributes) => axios.post(`${HOSTNAME}/api/posts`, values),
    {
      onMutate: (values: NewPostAttributes) => {
        // This prevents race
        queryClient.cancelQueries('posts'); // To make sure, there are no updates in progress

        const rollbackValue = queryClient.getQueryData<Post[]>('posts');

        const optimisticPost = {
          ...values,
          id: Date.now()
        };

        const updater = (oldPosts?: Post[]) => [
          ...(oldPosts ?? []), 
          optimisticPost
        ];

        queryClient.setQueryData(
          'posts',
          updater,
        );

        // Either pass values and complete processing in onError
        return rollbackValue; // Goest to 3rd argument of onError

        // Or return a callback
        /*
        return () => queryClient.setQueryData('posts', rollbackValue);
        */
      },
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.editablePosts);
      },
      onError: (error, values, rollbackValue) => {
        console.log(error, error.response);
        // Either
        queryClient.setQueryData('posts', rollbackValue); // rollbackValue comes from onMutate
        // Or
        // if (rollbackValue) {
        //   rollbackValue()
        // }
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
    (values: EditPostAttributes) => axios.patch(`${HOSTNAME}/api/posts/${values.id}`, values),
    {
      onSuccess: (data, values) => {
        queryClient.setQueryData(['post', String(values.id)], data); // User will see update ASAP
        queryClient.invalidateQueries(['post', String(values.id)]); // Just to make sure that data is consistent
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
