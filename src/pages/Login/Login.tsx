import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import st from './Login.module.css'
import Heading from '../../components/Heading/Heading'
import { FormEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { baseUrl } from '../../helpers/API'
import { ILoginResponse } from '../../interfaces/ILoginResponse'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { userActions } from '../../store/user.slice'

export type LoginForm = {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

function Login() {
  const [error, setError] = useState<string | null>()
  const navigate = useNavigate()
  const dispath = useDispatch<AppDispatch>()

  function submit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const target = e.target as typeof e.target & LoginForm
    const { email, password } = target

    sendLogin(email.value, password.value)
  }

  async function sendLogin(email: string, password: string) {
    try {
      const data = await axios.post<ILoginResponse>(`${baseUrl}/login`, {
        email,
        password
      })

      if (data.data.access_token) {
        dispath(userActions.login(data.data.access_token))
        navigate('/')
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e)
        setError(e.response?.data.error)
      }
    }
  }

  return (
    <div className={st.login}>
      <Heading>Вход</Heading>
      {error && <div className={st.error}>{error}</div>}
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
