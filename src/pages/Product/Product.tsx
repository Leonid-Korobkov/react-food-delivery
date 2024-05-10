import { Await, useLoaderData } from 'react-router-dom'
import st from './Product.module.css'
import { IProduct } from '../../interfaces/IProduct'
import { Suspense } from 'react'
import Loader from '../../components/Loader/Loader.tsx'

function Product() {
  const data = useLoaderData() as { data: IProduct }

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.data}>{({ data }: { data: IProduct }) => <div className={st.product}>Product - {data.name}</div>}</Await>
    </Suspense>
  )
}

export default Product
