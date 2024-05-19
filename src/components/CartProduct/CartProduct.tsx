import { useState } from 'react'
import { CartActions } from '../../store/cart.slice'
import { AppDispatch } from '../../store/store'
import st from './CartProduct.module.css'
import { useDispatch } from 'react-redux'
import Skeleton from '../Skeletons/Skeleton/Skeleton'

interface CartProductProps {
  id: number
  name: string
  image: string
  price: number
  count: number
}

function CartProduct(props: CartProductProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const increase = () => {
    dispatch(CartActions.addProduct(props.id))
  }

  const descrease = () => {
    dispatch(CartActions.removeProduct(props.id))
  }

  const clearAllProduct = () => {
    dispatch(CartActions.clearProduct(props.id))
  }

  return (
    <div className={st.item}>
      <div className={st.image}>
        <img
          style={{ opacity: imageLoaded ? '1' : '0' }}
          className={st.cardImage}
          src={props.image}
          alt={props.name}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && <Skeleton width="100%" height="100%" />}
      </div>
      <div className={st.description}>
        <div className={st.name}>{props.name}</div>
        <div className={st.price}>{props.price}&nbsp;₽</div>
      </div>

      <div className={st.actions}>
        <button className={st.minus} onClick={descrease}>
          <img src="/minus-icon.svg" alt="Удалить из корзины" />
        </button>
        <div className={st.number}>{props.count}</div>
        <button className={st.plus} onClick={increase}>
          <img src="/plus-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={st.remove} onClick={clearAllProduct}>
          <img src="/delete-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  )
}

export default CartProduct
