import { CartActions } from '../../store/cart.slice'
import { AppDispatch } from '../../store/store'
import styles from './CartProduct.module.css'
import { useDispatch } from 'react-redux'

interface CartProductProps {
  id: number
  name: string
  image: string
  price: number
  count: number
}

function CartProduct(props: CartProductProps) {
  const dispatch = useDispatch<AppDispatch>()

  const increase = () => {
    dispatch(CartActions.addProduct(props.id))
  }

  const descrease = () => {}

  const remove = () => {}

  return (
    <div className={styles.item}>
      <div className={styles.image} style={{ backgroundImage: `url('${props.image}')` }}></div>
      <div className={styles.description}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.currency}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={descrease}>
          <img src="/cart-button-icon.svg" alt="Удалить из корзины" />
        </button>
        <div>{props.count}</div>
        <button className={styles.button} onClick={increase}>
          <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles.remove} onClick={remove}>
          <img src="/cart-button-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  )
}

export default CartProduct
