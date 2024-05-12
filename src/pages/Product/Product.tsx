import { Await, Link, useLoaderData } from 'react-router-dom'
import st from './Product.module.css'
import { IProduct } from '../../interfaces/IProduct'
import { Suspense, useState } from 'react'
import Loader from '../../components/Loader/Loader.tsx'
import Skeleton from '../../components/Skeletons/Skeleton/Skeleton.tsx'
import Heading from '../../components/Heading/Heading.tsx'
import Button from '../../components/Button/Button.tsx'

function Product() {
  const data = useLoaderData() as { data: IProduct }
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.data}>
        {({ data }: { data: IProduct }) => (
          <>
            <div className={st.header}>
              <Link to="/" className={st.back}>
                <img src="/back.png" alt="Иконка назад" />
              </Link>
              <Heading>{data.name}</Heading>
              <Button className={st.addToCart}>
                <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
                <span>Добавить в корзину</span>
              </Button>
            </div>
            <div className={st.container}>
              <div className={st.imageContainer}>
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
              </div>
              <div className={st.details}>
                <div className={st.row}>
                  <div className={st.title}>Цена:</div>
                  <div className={st.price}>
                    {data.price} <span className={st.currency}>₽</span>
                  </div>
                </div>

                <div className={st.row}>
                  <div className={st.title}>Рейтинг:</div>
                  <div className={st.rating}>
                    {data.rating} <img src="/star-icon.svg" alt="Иконка звезды" />
                  </div>
                </div>

                <div className={st.ingredients}>
                  <div className={st.title}>Состав:</div>
                  <ul>
                    {data.ingredients.split(', ').map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
  )
}

export default Product
