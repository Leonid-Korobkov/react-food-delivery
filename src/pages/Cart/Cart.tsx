import st from './Cart.module.css'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios'
import { IProduct } from '../../interfaces/IProduct'
import Heading from '../../components/Heading/Heading'
import CartProduct from '../../components/CartProduct/CartProduct'
import { baseUrl } from '../../helpers/API'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { CartActions } from '../../store/cart.slice'
import Loader from '../../components/Loader/Loader'

const DELIVERY_COST = 169

function Cart() {
  const products = useSelector((state: RootState) => state.cart.products)
  const tokenUser = useSelector((state: RootState) => state.user.jwt)

  const [cartProducts, setCartProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => {
      const product = cartProducts.find((p) => p.id === item.id)
      return product ? acc + item.count * product.price : acc
    }, 0)
  }, [products, cartProducts])

  const getProductById = useCallback(async (id: number) => {
    const { data } = await axios.get<IProduct>(`${baseUrl}/products/${id}`)
    return data
  }, [])

  const loadAllProducts = useCallback(async () => {
    const res = await Promise.all(products.map((i) => getProductById(i.id)))

    setCartProducts(res)
    setIsLoading(false)
  }, [getProductById])

  useEffect(() => {
    if (products.length > 0) {
      loadAllProducts()
    } else {
      setIsLoading(false)
    }
  }, [loadAllProducts])

  const checkout = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/order`, { products }, { headers: { Authorization: `Bearer ${tokenUser}` } })
      console.log(data)
      dispatch(CartActions.clearCart())
      navigate('/success')
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  if (isLoading) {
    return (
      <>
        <Heading className={st.heading}>Корзина</Heading>
        <Loader />
      </>
    )
  } else if (products.length === 0) {
    return (
      <>
        <Heading className={st.heading}>Корзина</Heading>
        <div className={st.empty}>
          <img src="/cart-basket.png" alt="Корзина пуста" />
          <span>Ваша корзина пуста</span>
        </div>
      </>
    )
  }

  return (
    <>
      <Heading className={st.heading}>Корзина</Heading>

      {products.map((item) => {
        const product = cartProducts.find((p) => p.id === item.id)
        if (!product) return null
        return <CartProduct key={item.id} count={item.count} {...product} />
      })}

      <div className={st.line}>
        <div className={st.text}>Итог</div>
        <div className={st.price}>
          {totalPrice}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={st.hr} />
      <div className={st.line}>
        <div className={st.text}>Доставка</div>
        <div className={st.price}>
          {DELIVERY_COST}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={st.hr} />
      <div className={st.line}>
        <div className={st.text}>
          Итог <span className={st['totalPrice-count']}>({products.length})</span>
        </div>
        <div className={st.price}>
          {totalPrice + DELIVERY_COST}&nbsp;<span>₽</span>
        </div>
      </div>
      <div className={st.checkout}>
        <Button appearance="big" onClick={checkout}>
          оформить
        </Button>
      </div>
    </>
  )
}

export default Cart
