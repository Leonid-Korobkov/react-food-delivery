import { Link } from 'react-router-dom'
import st from './ProductCard.module.css'

interface ProductCardProps {
  id: number
  name: string
  description: string
  image: string
  price: number
  rating: number
}

function ProductCard(props: ProductCardProps) {
  return (
    <Link to={`/product/${props.id}`} className={st.link}>
      <div className={st.card}>
        <div className={st.head} style={{ backgroundImage: `url('${props.image}')` }}>
          <div className={st.price}>
            {props.price}&nbsp;
            <span className={st.currency}>₽</span>
          </div>
          <button className={st.addToCart}>
            <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
          </button>
          <div className={st.rating}>
            {props.rating}&nbsp;
            <img src="/star-icon.svg" alt="Иконка звезды" />
          </div>
        </div>
        <div className={st.footer}>
          <div className={st.title}>{props.name}</div>
          <div className={st.description}>{props.description}</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
