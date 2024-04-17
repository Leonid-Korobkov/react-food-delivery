import { Link } from 'react-router-dom'
import st from './ProductCard.module.css'
import { CSSProperties, useState } from 'react'
import Skeleton from '../Skeletons/Skeleton/Skeleton'
import cn from 'classnames'

interface ProductCardProps {
  id: number
  name: string
  description: string
  image: string
  price: number
  rating: number
  style: CSSProperties
}

function ProductCard(props: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <Link to={`/product/${props.id}`} className={st.link}>
      <div className={cn(st.card)} style={props.style}>
        <div className={st.head}>
          <img
            style={{ opacity: imageLoaded ? '1' : '0' }}
            className={st.cardImage}
            src={props.image}
            alt={props.name}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && <Skeleton width="100%" height="165px" />}
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
