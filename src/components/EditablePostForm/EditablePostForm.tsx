import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useCreatePostMutation } from '../../queries';
import { NewPostAttributes, useEditablePostQuery } from '../../queries/editablePosts.query';
import { PostForm } from '../EditablePostList/EditablePostList';

export const EditablePostForm = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const postQuery = useEditablePostQuery({
    postId,
    queryClient,
  });

  const postsMutation = useCreatePostMutation(queryClient);

  const handleSubmit = useCallback(
    (values: NewPostAttributes) => {
      postsMutation.mutate(values);
    },
    [postsMutation],
  );

  return (
    <div>
      <h3>
        <Link to={`/example8/${postId}`}>Post {postId}</Link>
      </h3>
      <PostForm
        initialData={postQuery.data}
        onSubmit={handleSubmit}
        clearOnSubmit
        isEdit
        isLoading={postQuery.isLoading}
      />
    </div>
  );
};
