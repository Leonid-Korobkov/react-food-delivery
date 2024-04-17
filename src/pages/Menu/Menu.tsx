import { useEffect, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import { baseUrl } from '../../helpers/API'
import st from './Menu.module.css'
import { IProduct } from '../../interfaces/IProduct'
import axios from 'axios'
import ProductSkeleton from '../../components/Skeletons/ProductSkeleton/ProductSkeleton.tsx'

function Menu() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function getProducts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IProduct[]>(`${baseUrl}/products`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProducts(data)
      setIsLoading(false)
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
        {isLoading &&
          // generate 10 skeletons
          Array.from({ length: 10 }, (_, index) => index).map((_, i) => <ProductSkeleton key={i} />)}
        {!isLoading &&
          products.map((p) => (
            // <CSSTransition key={p.id} in={(true)} appear={true} timeout={500} classNames="fade">
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.ingredients.join(', ')}
              image={p.image}
              price={p.price}
              rating={p.rating}
            />
            // </CSSTransition>
          ))}
      </div>
    </>
  )
}

export default Menu
