import st from './Cart.module.css'
import { RootState } from '../../store/store'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IProduct } from '../../interfaces/IProduct'
import Heading from '../../components/Heading/Heading'
import CartProduct from '../../components/CartProduct/CartProduct'
import { baseUrl } from '../../helpers/API'
import { useSelector } from 'react-redux'

function Cart() {
  const products = useSelector((state: RootState) => state.cart.products)
  const [cartProducts, setCardProducts] = useState<IProduct[]>([])

  async function getProductById(id: number) {
    const { data } = await axios.get<IProduct>(`${baseUrl}/products/${id}`)
    return data
  }

  async function loadAllProducts() {
    const res = await Promise.all(products.map((i) => getProductById(i.id)))
    setCardProducts(res)
  }

  useEffect(() => {
    loadAllProducts()
  }, [products])

  return (
    <>
      <Heading className={st.heading}>Корзина</Heading>
      {products.length == 0 ? (
        <div className={st.empty}>
          <img src='/cart-basket.png'/>
          <span>Ваша корзина пуста</span>
        </div>
      ) : (
        products.map((i) => {
          const product = cartProducts.find((p) => p.id === i.id)
          if (!product) {
            return
          }
          return <CartProduct key={i.id} count={i.count} {...product} />
        })
      )}
    </>
  )
}

export default Cart
