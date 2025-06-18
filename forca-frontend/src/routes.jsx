import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/game", element: <Game /> },
  { path: "/ranking", element: <Ranking /> },
]);

export default router;
