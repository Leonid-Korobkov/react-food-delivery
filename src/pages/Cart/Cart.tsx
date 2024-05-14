import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'

import { useEffect, useState } from 'react'

import axios from 'axios'
import { IProduct } from '../../interfaces/IProduct'
import Heading from '../../components/Heading/Heading'
import CartProduct from '../../components/CartProduct/CartProduct'
import { baseUrl } from '../../helpers/API'

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
  })

  return (
    <>
      <Heading>Корзина</Heading>
      {products.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id)
        if (!product) {
          return
        }
        return <CartProduct count={i.count} {...product} />
      })}
    </>
  )
}

export default Cart
