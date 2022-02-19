import { useUserQuery } from '../queries';
import { usePostsQuery } from '../queries/posts.query';

export const MyPosts = () => {
  const userQuery = useUserQuery();
  const postsQuery = usePostsQuery({ userId: userQuery.data?.id });

  return userQuery.isLoading ? (
    <p>Loading User...</p>
  ) : (
    <div>
      <p>User Id: {userQuery.data?.id}</p>
      <p>User Name: {userQuery.data?.name}</p>

      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        <p>Loading User Posts...</p>
      ) : (
        <div>
          {postsQuery.data?.map(({ body, title, id }) => (
            <article key={id}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
          <p>User Posts Count: {postsQuery.data?.length ?? 0}</p>
        </div>
      )}
    </div>
  );
};
