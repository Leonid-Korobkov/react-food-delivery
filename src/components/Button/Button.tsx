import { ButtonHTMLAttributes, ReactNode } from 'react'
import st from './Button.module.css'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  appearance?: 'small' | 'big'
}

function Button({ children, className, appearance = 'small', ...props }: ButtonProps) {
  return (
    <button
      className={cn(st['btn'], st['btn--accent'], className, {
        [st['btn--small']]: appearance === 'small',
        [st['btn--big']]: appearance === 'big'
      })}
      {...props}
    >
      {children}
    </button>
  )
}
export default Button
