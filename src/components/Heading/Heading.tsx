import cn from 'classnames'
import st from './Heading.module.css'
import { HTMLAttributes, ReactNode } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h1 className={cn(className, st.heading)} {...props}>
      {children}
    </h1>
  )
}

export default Heading
