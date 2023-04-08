import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import App from './App'
import ViewRecipe from './pages/viewRecipe';
import EditRecipe from './pages/editRecipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/recipes/:slug',
    element: <ViewRecipe />,
  },
  {
    path: '/recipes/edit/:slug',
    element: <EditRecipe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);