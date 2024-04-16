import { useEffect, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import { baseUrl } from '../../helpers/API'
import st from './Menu.module.css'
import { IProduct } from '../../interfaces/IProduct'

function Menu() {
  const [products, setProducts] = useState<IProduct[]>([])
  
  async function getProducts() {
    console.log('getProducts')
    try {
      const res = await fetch(`${baseUrl}/products`)
      if (!res.ok) return

      const data = (await res.json()) as IProduct[]
      setProducts(data)
    } catch (e) {
      console.log(e)
      return
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className={st.menuHeader}>
        <Heading>Меню</Heading>
        <Search placeholder="Введите блюдо или состав"></Search>
      </div>
      <div className={st.menuList}>
        {products.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} description={p.ingredients.join(', ')} image={p.image} price={p.price} rating={p.rating} />
        ))}
      </div>
    </>
  )
}

export default Menu
