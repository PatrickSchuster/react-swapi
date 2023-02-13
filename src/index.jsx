import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
  
import './index.css';

import Overview from "./components/overview/overview"
import Details from './components/details/details'; 

const router = createBrowserRouter([
    {
      path: "/",
      element: <Overview/>,
      children: [
        {
            path: "details/:id",
            element: <Details />,
        },
      ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);