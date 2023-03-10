import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PokemonDetailRoute } from './pokemon/routes/PokemonDetail.route';
import { PokemonListRoute } from './pokemon/routes/PokemonList.route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonListRoute />,
    children: [
      {
        path: '/pokemon/:name',
        element: <PokemonDetailRoute />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
