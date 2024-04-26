import { NavLink, Outlet, useLocation } from 'react-router-dom'
import st from './Menu.module.css'
import Button from '../../components/Button/Button'
import { useEffect } from 'react'
import cn from 'classnames'

function Layout() {
  const location = useLocation()

  useEffect(() => {}, [location])

  return (
    <div className={st.layout}>
      <div className={st.sidebar}>
        <div className={st.user}>
          <img className={st.avatar} src="/avatar.png" alt="Аватар пользователя" />
          <div className={st.name}>Leonid Korobkov</div>
          <div className={st.email}>Korobkov@example.com</div>
        </div>
        <div className={st.menu}>
          <NavLink className={({ isActive }) => cn(st.link, { [st.active]: isActive })} to={'/'}>
            <img src="/menu-icon.svg" alt="Иконка меню" />
            Меню
          </NavLink>
          <NavLink className={({ isActive }) => cn(st.link, { [st.active]: isActive })} to={'/cart'}>
            <img src="/cart-icon.svg" alt="Иконка корзины" />
            Корзина
          </NavLink>
        </div>
        <Button className={st.exit}>
          <img src="/exit-icon.svg" alt="Иконка выходы" />
          <span>Выйти</span>
        </Button>
      </div>
      <div className={st.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
