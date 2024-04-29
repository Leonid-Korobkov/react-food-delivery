import { useLoaderData, useParams } from 'react-router-dom'
import st from './Product.module.css'
import { IProduct } from '../../interfaces/IProduct'

function Product() {
  const data = useLoaderData() as IProduct

  return <div className={st.product}>Product - {data.name}</div>
}

export default Product
