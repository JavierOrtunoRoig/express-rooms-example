import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Room } from './routes/room.jsx';
import { Toaster } from 'react-hot-toast';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { roomLoader } from './loaders.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/room/:id',
    element: <Room />,
    loader: roomLoader
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
