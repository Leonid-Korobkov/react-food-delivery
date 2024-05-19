import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import st from './Menu.module.css'
import Button from '../../components/Button/Button'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getProfile, userActions } from '../../store/user.slice'
import { useEffect, useState } from 'react'
import Skeleton from '../../components/Skeletons/Skeleton/Skeleton'

function Layout() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.user.profile)
  const cart = useSelector((state: RootState) => state.cart)

  const [imageUserLoaded, setImageUserLoaded] = useState<boolean>(false)

  const countCartProducts = cart.products.reduce((acc, p) => (acc += p.count), 0)
  
  const handleImageUserLoad = () => {
    setImageUserLoaded(true)
  }

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  function logout() {
    dispatch(userActions.logout())
    navigate('/auth/login')
  }

  return (
    <div className={st.layout}>
      <div className={st.sidebar}>
        <div className={st.user}>
          <img
            className={st.avatar}
            src="/avatar.png"
            alt="Аватар пользователя"
            style={{ opacity: imageUserLoaded ? '1' : '0' }}
            onLoad={handleImageUserLoad}
          />
          {!imageUserLoaded && <Skeleton width="75px" height="75px" style={{ margin: '0 auto 20px' }} />}

          {!profile ? (
            <>
              <Skeleton width="60%" height="23px" style={{ margin: '20px auto 5px' }} />
              <Skeleton width="75%" height="16px" style={{ margin: '0 auto' }} />
            </>
          ) : (
            <>
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
            <span className={st.cart}>
              Корзина
              <div className={st.cartCount}>{countCartProducts}</div>
            </span>
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
