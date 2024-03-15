
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import Accounts from './Pages/Accounts';
import LandingPage from './Pages/LandingPage'; 
import DexAnalysis from './Pages/DexAnalysis';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dexanalysis", element: <DexAnalysis/> },
      { path: "products", element: <Products /> },
      { path: "accounts", element: <Accounts /> },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
