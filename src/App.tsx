import { useState } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input'

function App() {
  const [isValid, setIsValid] = useState()
  return (
    <>
      <Button onClick={() => null}>Кнопка</Button>
      <Button appearance='big'>Большая</Button>
      <Input placeholder=''></Input>
    </>
  )
}

export default App
