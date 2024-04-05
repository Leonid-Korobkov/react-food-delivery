import { forwardRef, InputHTMLAttributes } from 'react'
import st from './Search.module.css'
import cn from 'classnames'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean
}

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ isValid = true, className, ...props }, ref) {
  return (
    <div className={st.inputWrapper}>
      <input
        ref={ref}
        className={cn(st['input'], className, {
          [st['invalid']]: isValid
        })}
        {...props}
      />
      <img className={st.searchIcon} src="/search-icon.svg" alt="Иконка поиска" />
    </div>
  )
})

export default Search
