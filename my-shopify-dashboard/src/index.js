
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { AppProvider } from '@shopify/polaris';
import App from './App';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import Tasks from './Pages/Tasks';
import Accounts from './Pages/Accounts';
import LandingPage from './Pages/LandingPage'; // Import the LandingPage component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> }, // Set LandingPage as the index route
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "accounts", element: <Accounts /> },
      { path: "tasks", element: <Tasks /> },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider i18n={{}}> {/* Wrap RouterProvider with AppProvider */}
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
