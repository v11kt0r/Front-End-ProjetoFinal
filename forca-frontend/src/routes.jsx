import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import WordAdmin from './pages/WordAdmin';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/game", element: <Game /> },
  { path: "/ranking", element: <Ranking /> },
   {path: '/admin-palavras',element: <WordAdmin />,},
]);

export default router;
