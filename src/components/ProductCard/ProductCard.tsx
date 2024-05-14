import { Link } from 'react-router-dom'
import st from './ProductCard.module.css'
import { CSSProperties, MouseEvent, useEffect, useState } from 'react'
import Skeleton from '../Skeletons/Skeleton/Skeleton'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { CartActions } from '../../store/cart.slice'

interface ProductCardProps {
  id: number
  name: string
  description: string
  image: string
  price: number
  rating: number
  style?: CSSProperties
}

function ProductCard(props: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [addedToCart, setAddedToCart] = useState<boolean>(false)
  const allProducts = useSelector((state: RootState) => state.cart.products)
  
  const dispatch = useDispatch<AppDispatch>()

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  useEffect(() => {
    const isAdded = allProducts.find((p) => p.id === props.id)
    console.log(isAdded)
    if (isAdded) {
      setAddedToCart(true)
    }
  }, [allProducts, props.id])

  function addToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    dispatch(CartActions.addProduct(props.id))

    event.currentTarget.classList.add(st.activeProduct)
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
          <button className={cn(st.addToCart, { [st.activeProduct]: addedToCart })} onClick={addToCart}>
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
