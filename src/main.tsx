import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Error from './pages/Error/Error'
import Layout from './layout/Menu/Menu'
import Product from './pages/Product/Product'
import axios from 'axios'
import { baseUrl } from './helpers/API'
import Loader from './components/Loader/Loader'
import AuthLayout from './layout/Auth/Auth'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import RequireAuth from './helpers/RequireAuth'
import { store } from './store/store' 
import { Provider } from 'react-redux'
import { Success } from './pages/Success/Success'

const Menu = lazy(() => import('./pages/Menu/Menu'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/cart',
        element: (
          <RequireAuth>
            <Cart />
          </RequireAuth>
        )
      },
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${baseUrl}/products/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e))
              }, 0)
            })
          })
          // axios.get(`${baseUrl}/products/${params.id}`).then(data => data)
          // const { data } = await axios.get(`${baseUrl}/products/${params.id}`)
          // return data
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/success',
    element: <Success/>
  },
  {
    path: '*',
    element: <Error />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
