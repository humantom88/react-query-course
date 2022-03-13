import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import {
  NewPostAttributes,
  useEditablePostsQuery,
  useCreatePostMutation,
} from '../../queries/editablePosts.query';
import { Post } from '../../queries/types';

import './EditablePostList.style.css';

const LOADING = 'Loading...';
const LOADING_DOTS = '...';
const TITLE_FIELD_LABEL = 'Title';
const TITLE_FIELD_PLACEHOLDER = 'Enter post title';
const CREATE_POST_BUTTON_TEXT = 'Create Post';
const CREATE_NEW_POST = 'Create New Post';
const SAVE_CHANGES = 'Save Changes';
const SAVING = 'Saving...';

export function EditablePosts() {
  const queryClient = useQueryClient();
  const postsQuery = useEditablePostsQuery();
  const postsMutation = useCreatePostMutation(queryClient);

  const handleSubmit = useCallback(
    (values: NewPostAttributes) => {
      postsMutation.mutate(values);
    },
    [postsMutation],
  );

  return (
    <div>
      <div>
        {postsQuery.isLoading ? (
          <span>{LOADING}</span>
        ) : (
          <>
            <h3>Posts {postsQuery.isLoading ? LOADING_DOTS : null}</h3>
            <ul>
              {postsQuery.data?.map((post: Post, idx: number) => (
                <li key={`${post.title}${idx}`}>
                  <Link to={`/example8/${post.id || idx}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <PostForm
        onSubmit={handleSubmit}
        isLoading={postsMutation.isLoading}
        error={postsMutation.error?.message}
      />
      {postsMutation.isError && <pre>{postsMutation.error.response?.data ?? postsMutation.error.message}</pre>}
    </div>
  );
}

interface PostFormProps {
  initialData?: Post;
  onSubmit: (values: NewPostAttributes) => void;
  clearOnSubmit?: boolean;
  isLoading?: boolean;
  error?: string;
  isEdit?: boolean;
}

export const PostForm = ({
  initialData,
  onSubmit,
  clearOnSubmit = false,
  error,
  isLoading = false,
  isEdit = false,
}: PostFormProps) => {
  const [title, setTitle] = useState<string>(initialData?.title ?? '');

  const handleChangeTitle = useCallback(
    (ev) => {
      setTitle(ev.target.value);
    },
    [setTitle],
  );

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();

      onSubmit({ title });

      if (clearOnSubmit) {
        setTitle('');
      }
    },
    [title, onSubmit, clearOnSubmit],
  );

  useEffect(() => {
    setTitle(initialData?.title ?? '');
  }, [initialData?.title]);

  return (
    <form onSubmit={handleSubmit} method="get">
      {isEdit ? null : <h3>{CREATE_NEW_POST}</h3>}
      <div className="titleField">
        <label htmlFor="title">{TITLE_FIELD_LABEL}</label>
        <input
          name="title"
          placeholder={TITLE_FIELD_PLACEHOLDER}
          onChange={handleChangeTitle}
          value={title}
        />
        <span className="error">{error}</span>
        <button disabled={isLoading}>{getButtonText({ isLoading, isEdit })}</button>
      </div>
    </form>
  );
};

// private

const getButtonText = ({ isLoading, isEdit }: { isLoading: boolean; isEdit: boolean }) => {
  if (isLoading) {
    return SAVING;
  }

  return isEdit ? SAVE_CHANGES : CREATE_POST_BUTTON_TEXT;
};
