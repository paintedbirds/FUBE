'use client'

import { Button } from '@chakra-ui/react'

import styles from './page.module.css'

const variable: number = 'string'

export default function Home() {
  return (
    <main className={styles.main}>
      <Button>Button</Button>
    </main>
  )
}
