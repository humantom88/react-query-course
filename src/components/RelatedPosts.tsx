import React, { SetStateAction } from 'react';
import { useQueryClient } from 'react-query';
import { usePostQuery } from '../queries/post.query';
import { usePostsQuery } from '../queries/posts.query';

export const RelatedPostsPart = () => {
  const [postId, setPostId] = React.useState(-1);

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </div>
  );
};

function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const postQuery = usePostQuery({ postId, queryClient });
  return (
    <div>
      <a onClick={() => setPostId(-1)} href="#">
        Back
      </a>
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

function Posts({ setPostId }: { setPostId: React.Dispatch<SetStateAction<number>> }) {
  const postsQuery = usePostsQuery();

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? ' Updating...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data?.map((post) => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
