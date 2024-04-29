import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import Error from './pages/Error/Error'
import Layout from './layout/Menu/Menu'
import Product from './pages/Product/Product'
import axios from 'axios'
import { baseUrl } from './helpers/API'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/',
        element: <Menu />
      },
      {
        path: '/product/:id',
        element: <Product />,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${baseUrl}/products/${params.id}`)
          return data
        }
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
