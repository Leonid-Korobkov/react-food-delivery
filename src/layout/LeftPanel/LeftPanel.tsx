import { NavLink, Outlet, useLocation } from 'react-router-dom'
import st from './LeftPanel.module.css'
import Button from '../../components/Button/Button'
import { useEffect } from 'react'
import cn from 'classnames'

function Layout() {
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <div className={st.layout}>
      <div className={st.sidebar}>
        <div className={st.user}>
          <img className={st.avatar} src="/public/avatar.png" alt="Аватар пользователя" />
          <div className={st.name}>Leonid Korobkov</div>
          <div className={st.email}>Korobkov@example.com</div>
        </div>
        <div className={st.menu}>
          <NavLink className={({ isActive }) => cn(st.link, { [st.active]: isActive })} to={'/'}>
            <img src="/public/menu-icon.svg" alt="Иконка меню" />
            Menu
          </NavLink>
          <NavLink className={({ isActive }) => cn(st.link, { [st.active]: isActive })} to={'/cart'}>
            <img src="/public/cart-icon.svg" alt="Иконка корзины" />
            Cart
          </NavLink>
        </div>
        <Button className={st.exit}>
          <img src="/public/exit-icon.svg" alt="Иконка выходы" />
          Выйти
        </Button>
      </div>
      <div className={st.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
