import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import st from './Success.module.css'

export function Success() {
  const navigate = useNavigate()
  return (
    <div className={st.success}>
      <img src="/pizza.png" alt="Изображение пиццы" />
      <div className={st.text}>Ваш заказ успешно оформлен!</div>
      <Button appearance="big" onClick={() => navigate('/')}>
        Сделать новый
      </Button>
    </div>
  )
}
