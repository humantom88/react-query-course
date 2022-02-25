import { Route, Routes } from 'react-router-dom';
import { Posts } from './components/Posts';
import { Post } from './components/Post';
import { Example1Page, Example2Page, Example3Page, MainPage } from './pages';
import { ServerDate } from './components/ServerDate';
import { RandomNumber } from './components/RandomNumber';
import { PreFetchedPosts } from './components/PreFetchPosts';
import { EditablePosts } from './pages/EditablePostList';

export const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/example1" element={<Example1Page />} />
    <Route path="/example2" element={<Example2Page />} />
    <Route path="/example3" element={<Example3Page />} />
    <Route path="/example4/:postId" element={<Post />} />
    <Route path="/example4/" element={<Posts />} />
    <Route path="/example5" element={<ServerDate />} />
    <Route path="/example6" element={<RandomNumber />} />
    <Route path="/example7" element={<PreFetchedPosts />} />
    <Route path="/example8" element={<EditablePosts />} />
  </Routes>
);
