import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Error from './pages/Error/Error'
import Layout from './layout/Menu/Menu'
import Product from './pages/Product/Product'
import axios from 'axios'
import { baseUrl } from './helpers/API'

const Menu = lazy(() => import('./pages/Menu/Menu'))

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${baseUrl}/products/${params.id}`)
          return data
        }
      }
    ]
  },
  {
    path: '/cart',
    element: <Cart />
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
