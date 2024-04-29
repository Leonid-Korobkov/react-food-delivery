import ProductCard from '../../../components/ProductCard/ProductCard'
import { IProduct } from '../../../interfaces/IProduct'

interface MenuListProps {
  products: IProduct[]
}

function MenuList(props: MenuListProps) {
  return props.products.map((p, index) => (
    <ProductCard
      key={p.id}
      id={p.id}
      name={p.name}
      description={p.ingredients}
      image={p.image}
      price={p.price}
      rating={p.rating}
      style={{ animationDelay: `${index * 0.1}s` }} // добавляем задержку
    />
  ))
}

export default MenuList
