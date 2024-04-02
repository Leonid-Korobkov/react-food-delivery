import { forwardRef, InputHTMLAttributes } from 'react'
import st from './Input.module.css'
import cn from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(st['input'], className, {
        [st['invalid']]: isValid
      })}
      {...props}
    />
  )
})

export default Input
