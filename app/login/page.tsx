'use client'

import { Button, Container, Input } from '@chakra-ui/react'

import { useLogin } from './useLogin'

export default function Login() {
  const { mutate: loginRequest } = useLogin()

  const handleSubmit = () => {
    loginRequest({ username: 'admin', password: 'admin' })
  }

  return (
    <Container>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button onClick={handleSubmit}>Button</Button>
    </Container>
  )
}
