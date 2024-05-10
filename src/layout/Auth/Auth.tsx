import { Outlet, useLocation } from 'react-router-dom'
import st from './Auth.module.css'
import { useEffect } from 'react'

function AuthLayout() {
  const location = useLocation()

  useEffect(() => {}, [location])

  return (
    <div className={st.layout}>
      <div className={st.logo}>
        <img src="/logo.svg" alt="Логотип компании"/>
      </div>
      <div className={st.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
