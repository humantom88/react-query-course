import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import { Router } from './routes';

function App() {
  return (
    <div className="App">
      <Router />
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
