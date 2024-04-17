import { useEffect, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import Search from '../../components/Search/Search'
import { baseUrl } from '../../helpers/API'
import st from './Menu.module.css'
import { IProduct } from '../../interfaces/IProduct'
import axios, { AxiosError } from 'axios'
import ProductSkeleton from '../../components/Skeletons/ProductSkeleton/ProductSkeleton.tsx'
import MenuList from './MenuList/MenuList.tsx'

function Menu() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | undefined>()

  async function getProducts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IProduct[]>(`${baseUrl}/products`)
      setProducts(data)
      //await new Promise((resolve) => setTimeout(resolve, 10000))
      setIsLoading(false)
    } catch (e) {
      console.log(e)

      if (e instanceof AxiosError) {
        setIsError(e.message)
      }
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
        {isError && <div>{isError}</div>}

        {isLoading &&
          !isError &&
          // generate 10 skeletons
          Array.from({ length: 10 }, (_, index) => index).map((_, i) => <ProductSkeleton key={i} />)}

        {!isLoading && <MenuList products={products} />}
      </div>
    </>
  )
}

export default Menu
