import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import Search from '../../components/Search/Search'
import { baseUrl } from '../../helpers/API'
import st from './Menu.module.css'
import { IProduct } from '../../interfaces/IProduct'
import axios, { AxiosError } from 'axios'
import ProductSkeleton from '../../components/Skeletons/ProductSkeleton/ProductSkeleton.tsx'
import MenuList from '../../components/MenuList/MenuList.tsx'

function Menu() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<string | undefined>()
  const [loaderSkeleton, setLoaderSkeleton] = useState<ReactNode[]>([])

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const connection = navigator.connection
    if (connection) {
      const speed = connection.downlink // Скорость загрузки в мегабитах в секунду
      if (speed) {
        setLoaderSkeleton(speed > 1.5 ? [] : Array.from({ length: 10 }, (_, i) => <ProductSkeleton key={i} />))
      }
    } else {
      // API navigator.connection не поддерживается
      console.log('API navigator.connection не поддерживается')
      setLoaderSkeleton(Array.from({ length: 10 }, (_, i) => <ProductSkeleton key={i} />))
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IProduct[]>(`${baseUrl}/products`)
      setProducts(data)

      //* Искуственная задержка, если нужно продемонстрировать лоадер
      //await new Promise((resolve) => setTimeout(resolve, 2000))

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
    filterProducts()
  }, [searchValue, products])

  function filterProducts() {
    const filteredProducts = products.filter((p) => {
      const regex = new RegExp(searchValue, 'gi')

      const name = p.name.match(regex)
      const description = p.ingredients.match(regex)
      const price = p.price.toString().match(regex)
      const rating = p.rating.toString().match(regex)

      return name || description || price || rating
    })

    setFilteredProducts(filteredProducts)
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <div className={st.menuHeader}>
        <Heading>Меню</Heading>
        <Search placeholder="Введите блюдо или состав" onInput={handleInput}></Search>
      </div>

      <div className={st.menuList}>
        {isError && <div>{isError}</div>}

        {isLoading && !isError && loaderSkeleton}

        {!isLoading && filteredProducts.length === 0 && <div>Ничего не найдено</div>}
        {!isLoading && filteredProducts.length !== 0 && <MenuList products={filteredProducts} />}
      </div>
    </>
  )
}

export default Menu
