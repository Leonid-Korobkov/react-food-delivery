import { Await, Link, useLoaderData } from 'react-router-dom'
import st from './Product.module.css'
import { IProduct } from '../../interfaces/IProduct'
import { Suspense, useState } from 'react'
import Loader from '../../components/Loader/Loader.tsx'
import cn from 'classnames'
import Skeleton from '../../components/Skeletons/Skeleton/Skeleton.tsx'

function Product() {
  const data = useLoaderData() as { data: IProduct }
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <Suspense fallback={<Loader />}>
      {/* to home */}
      <Link to="/" className={st.back}><img src="/back.png" alt="Иконка назад" /></Link>
      <Await resolve={data.data}>
        {({ data }: { data: IProduct }) => (
          <div className={cn(st.card)}>
            <div className={st.head}>
              <img
                style={{ opacity: imageLoaded ? '1' : '0' }}
                className={st.cardImage}
                src={data.image}
                alt={data.name}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <Skeleton
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0
                  }}
                />
              )}
              <div className={st.price}>
                {data.price}&nbsp;
                <span className={st.currency}>₽</span>
              </div>
              <button className={st.addToCart}>
                <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
              </button>
              <div className={st.rating}>
                {data.rating}&nbsp;
                <img src="/star-icon.svg" alt="Иконка звезды" />
              </div>
            </div>
            <div className={st.footer}>
              <div className={st.title}>{data.name}</div>
              <div className={st.description}>{data.ingredients.split(', ').join(' ✦ ')}</div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  )
}

export default Product
