// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// 1. Definir las rutas
const router = createBrowserRouter([
  {
    path: '/', // Ruta principal: muestra la lista de posts
    element: <App />,
  },
  {
    path: '/nuevo', // Nueva ruta: muestra la lista Y activa el modal de creación
    element: <App initialRoute="new" />, // Pasamos una prop para indicar la ruta
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver la aplicación con el RouterProvider */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);