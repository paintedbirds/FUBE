'use client'

import { Button, Container, Input } from '@chakra-ui/react'

export default function Page() {
  return (
    <Container>
      <form>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button>Button</Button>
      </form>
    </Container>
  )
}
