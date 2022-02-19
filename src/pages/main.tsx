import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div>
      <h1>Examples:</h1>

      <ul>
        <li>
          <Link to="/example1">Pokemon Search</Link>
        </li>
        <li>
          <Link to="/example2">Pokemon List</Link>
        </li>
        <li>
          <Link to="/example3">Chained Queries</Link>
        </li>
        <li>
          <Link to="/example4">Related Posts</Link>
        </li>
      </ul>
    </div>
  );
};
