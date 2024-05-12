import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import st from './Login.module.css'
import Heading from '../../components/Heading/Heading'
import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { login, userActions } from '../../store/user.slice'

export type LoginForm = {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

function Login() {
  const navigate = useNavigate()
  const dispath = useDispatch<AppDispatch>()
  const { jwt, loginErrorMessage } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (jwt) {
      navigate('/')
    }
  }, [jwt, navigate])

  function submit(e: FormEvent) {
    e.preventDefault()
    dispath(userActions.clearLoginError())

    const target = e.target as typeof e.target & LoginForm
    const { email, password } = target

    dispath(login({ email: email.value, password: password.value }))
  }

  return (
    <div className={st.login}>
      <Heading>Вход</Heading>
      {loginErrorMessage && <div className={st.error}>{loginErrorMessage}</div>}
      <form className={st.form} onSubmit={submit}>
        <div className={st.field}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={st.field}>
          <label htmlFor="password">Ваш пароль</label>
          <Input id="password" name="password" type="password" placeholder="Пароль" />
        </div>
        <Button appearance="big">Вход</Button>
      </form>
      <div className={st.links}>
        <div>Нет акканута?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Login
