import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout'
import Home from './views/home/Home';
import Shop from './views/shop/Shop';
import { useEffect, useState } from 'react';
import ShopDetail from './views/shop/ShopDetail';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/shop/:cat',
          element: <Shop />
        },
        {
          path: '/:cat/:id',
          element: <ShopDetail />
        }
      ]
    }
  ]
);

function App() {

  const [data, setData] = useState({ sp: [], isLoading: false });

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res=>res.json())
      .then(kq => setData({ sp: kq, isLoading: true }))
      .catch(e => console.error(e))
  })

  if (!data.isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  } else {
    return (
      <>
        <RouterProvider router={router} />
      </>
    )
  }
}

export default App
