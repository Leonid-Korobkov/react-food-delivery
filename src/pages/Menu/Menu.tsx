import Heading from '../../components/Heading/Heading'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import st from './Menu.module.css'

function Menu() {
  return (
    <>
      <div className={st.menuHeader}>
        <Heading>Menu</Heading>
        <Search placeholder="Введите блюдо или состав"></Search>
      </div>
      <div>
        <ProductCard
          id={1}
          name="Бургер"
          description="Булочка с курицей, помидорами, сыром, салатом и соусом бургер"
          image="/product-demo.png"
          price={100}
          rating={5}
        ></ProductCard>
      </div>
    </>
  )
}

export default Menu
