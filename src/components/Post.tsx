import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { usePostQuery } from '../queries/post.query';

export function Post() {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const postQuery = usePostQuery({ postId, queryClient });
  return (
    <div>
      <a href={`/example4`}>Back</a>
      <br />
      <br />
      {postQuery.isLoading ? (
        'Loading...'
      ) : (
        <div>
          {postQuery.data?.title}
          <br />
          <br />
          {postQuery.isFetching ? 'Updating...' : null}
        </div>
      )}
    </div>
  );
}
