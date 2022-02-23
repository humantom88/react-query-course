import axios from 'axios';
import { useCallback, useEffect, useReducer } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { QueryKey } from '../queries/queryKeys';
import { Post } from '../queries/types';

export function PreFetchedPosts() {
  const [show, toggle] = useReducer((d) => !d, false);
  const queryClient = useQueryClient();
  const postsQuery = useQuery(QueryKey.posts, fetchPosts);

  const handleClickShowPosts = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleMouseEnter = (postId: number) => () => {
    queryClient.prefetchQuery([QueryKey.post, postId], () => fetchPost(postId), {
      staleTime: 60 * 1000,
    });
  };

  useEffect(() => {
    queryClient.prefetchQuery(QueryKey.posts, fetchPosts);
  }, [queryClient]);

  return (
    <div>
      <button onClick={handleClickShowPosts}>Show Posts</button>
      {show ? (
        <div>
          <h1>Pre Fetched Posts {postsQuery.isFetching ? ' Updating...' : null}</h1>
          <div>
            {postsQuery.isLoading ? (
              'Loading posts...'
            ) : (
              <ul>
                {postsQuery.data?.map((post: Post) => {
                  return (
                    <li key={post.id} onMouseEnter={handleMouseEnter(post.id)}>
                      <a href={`/example4/${post.id}`}>{post.title}</a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// private

const queryString = 'https://jsonplaceholder.typicode.com/posts';
const fetchPosts = async () => axios.get(queryString).then((res) => res.data);
const fetchPost = async (postId: number) =>
  axios.get(`${queryString}/${postId}`).then((res) => res.data);
