import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  NewPostAttributes,
  useEditablePostsQuery,
  useCreatePostMutation,
} from '../queries/editablePosts.query';
import { Post } from '../queries/types';

import './EditablePostList.style.css';

const LOADING = 'Loading...';
const LOADING_DOTS = '...';
const TITLE_FIELD_LABEL = 'Title';
const TITLE_FIELD_PLACEHOLDER = 'Enter post title';
const CREATE_POST_BUTTON_TEXT = 'Create Post';
const CREATE_NEW_POST = 'Create New Post';
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
              {postsQuery.data?.map((post: Post) => (
                <li key={post.title}>{post.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <PostForm onSubmit={handleSubmit} clearOnSubmit isLoading={postsMutation.isLoading} />
    </div>
  );
}

interface PostFormProps {
  onSubmit: (values: NewPostAttributes) => void;
  clearOnSubmit?: boolean;
  isLoading?: boolean;
}

export const PostForm = ({ onSubmit, clearOnSubmit = false, isLoading = false }: PostFormProps) => {
  const [title, setTitle] = useState<string>('');

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

  return (
    <form onSubmit={handleSubmit} method="get">
      <h3>{CREATE_NEW_POST}</h3>
      <div className="titleField">
        <label htmlFor="title">{TITLE_FIELD_LABEL}</label>
        <input name="title" placeholder={TITLE_FIELD_PLACEHOLDER} onChange={handleChangeTitle} />
        <button disabled={isLoading}>{isLoading ? SAVING : CREATE_POST_BUTTON_TEXT}</button>
      </div>
    </form>
  );
};
