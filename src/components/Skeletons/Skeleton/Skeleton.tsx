import './Skeleton.css'
import {CSSProperties} from 'react';

interface SkeletonProps {
  width: string
  height: string
  style?: CSSProperties;
}

function Skeleton({width, height, style}: SkeletonProps) {
  return (
    <div
      style={{width: '100%', maxWidth: width, height: height, ...style}}
      className={'skeleton'}>
    </div>
  )
}

export default Skeleton
