import { useEffect, useReducer } from 'react';
import { useQueryClient } from 'react-query';
import { usePostsQuery } from '../queries/posts.query';
import { QueryKey } from '../queries/queryKeys';

export function Posts() {
  const [count, increment] = useReducer((c) => c + 1, 0);

  const queryClient = useQueryClient();
  const postsQuery = usePostsQuery({ queryClient, callback: increment });

  useEffect(() => {
    queryClient.prefetchQuery(QueryKey.posts);
  }, [queryClient]);

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? ' Updating...' : null}</h1>
      {count}
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data?.map((post) => {
              return (
                <li key={post.id}>
                  <a href={`/example4/${post.id}`}>{post.title}</a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
