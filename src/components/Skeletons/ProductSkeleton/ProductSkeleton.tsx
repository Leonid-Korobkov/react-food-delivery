import './ProductSkeleton.css'
import Skeleton from '../Skeleton/Skeleton.tsx'

function ProductSkeleton() {
  return (
    <div className="ProductSkeleton">
      <Skeleton width="100%" height="165px" style={{ marginBottom: '27px' }} />
      <div className="ProductSkeletonFooter" style={{ height: '100%' }}>
        <Skeleton width="60%" height="20px" style={{ marginBottom: '10px' }} />
        <Skeleton width="100%" height="16px" style={{ marginBottom: '4px' }} />
        <Skeleton width="80%" height="16px" />
      </div>
    </div>
  )
}

export default ProductSkeleton
