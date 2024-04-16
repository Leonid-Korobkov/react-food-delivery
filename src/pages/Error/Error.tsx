import { Link } from 'react-router-dom'
import st from './Error.module.css'
import pizzaImage from '/pizza.png'

function Error() {
  return (
    <div className={st.errorContainer}>
      <img src={pizzaImage} alt="Pizza Error" className={st.errorImage} />
      <h1 className={st.errorHeading}>404 - Страница не найдена</h1>
      <p className={st.errorMessage}>К сожалению, запрашиваемая вами страница не найдена.</p>
      <p className={st.errorMessage}>
        Пожалуйста, вернитесь на{' '}
        <Link to={'/'} className={st.homeLink}>
          главную страницу
        </Link>
        .
      </p>
    </div>
  )
}

export default Error
