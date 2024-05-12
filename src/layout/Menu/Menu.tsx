import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import st from './Menu.module.css'
import Button from '../../components/Button/Button'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getProfile, userActions } from '../../store/user.slice'
import { useEffect } from 'react'
import Skeleton from '../../components/Skeletons/Skeleton/Skeleton'

function Layout() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.user.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  function logout() {
    dispatch(userActions.logout())
    navigate('/auth/login')
  }
  return (
    <div className={st.layout}>
      <div className={st.sidebar}>
        <div className={st.user}>
          {!profile ? (
            <>
              <Skeleton width="75px" height="75px" style={{ margin: '0 auto 20px' }} />
              <Skeleton width="60%" height="23px" style={{ margin: '0 auto 5px' }} />
              <Skeleton width="75%" height="16px" style={{ margin: '0 auto' }} />
            </>
          ) : (
            <>
              <img className={st.avatar} src="/avatar.png" alt="Аватар пользователя" />
              <div className={st.name}>{profile?.name}</div>
              <div className={st.email}>{profile?.email}</div>
            </>
          )}
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
        <Button className={st.exit} onClick={logout}>
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
