import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ListagemPaises from './pages/ListagemPaises';
import DetalhesPais from './pages/DetalhesPais';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ListagemPaises />
    },
    {
      path: '/pais/:id',
      element: <DetalhesPais />
    },
  ])

  return (
    <RouterProvider router={routes}/>
  );
}

export default App;