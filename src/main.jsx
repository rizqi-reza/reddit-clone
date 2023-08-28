import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

import Home from './pages/home';
import Subreddit from './pages/subreddit';
import Threads from './pages/threads';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/r/:name',
    element: <Subreddit />,
  },
  {
    path: '/r/:name/comments/:postId',
    element: <Threads />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
