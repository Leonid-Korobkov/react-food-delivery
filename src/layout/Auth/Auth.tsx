import { Link, Outlet } from 'react-router-dom'
import st from './Auth.module.css'

function AuthLayout() {
  return (
    <div className={st.layout}>
      <div className={st.logo}>
        <img src="/logo.svg" alt="Логотип компании" />
      </div>
      <div className={st.content}>
        <div className={st.backHome}>
          <Link to={'/'} className={st.linkToHome}>
            <img src="/back.png" alt="Иконка назад" />
            <span>Вернуться на главную</span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
