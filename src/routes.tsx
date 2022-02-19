import { Route, Routes } from 'react-router-dom';
import { Example1Page, Example2Page, Example3Page, Example4Page, MainPage } from './pages';

export const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/example1" element={<Example1Page />} />
    <Route path="/example2" element={<Example2Page />} />
    <Route path="/example3" element={<Example3Page />} />
    <Route path="/example4" element={<Example4Page />} />
  </Routes>
);
