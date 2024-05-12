import Heading from '../../components/Heading/Heading'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import st from '../Login/Login.module.css'

function Register() {
  return (
    <div className={st.login}>
      <Heading>Регистрация</Heading>
      <div className={st.error}>На данный момент регистрация не доступна. Возможен только вход</div>
      <form className={st.form}>
        <div className={st.field}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={st.field}>
          <label htmlFor="password">Ваш пароль</label>
          <Input id="password" name="password" type="password" placeholder="Пароль" />
        </div>
        <div className={st.field}>
          <label htmlFor="password">Ваше имя</label>
          <Input id="name" name="name" type="text" placeholder="Имя" />
        </div>
        <Button appearance="big">Регистрация</Button>
      </form>
      <div className={st.links}>
        <div>Есть аккаунт?</div>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  )
}

export default Register
