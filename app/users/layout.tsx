import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <Sidebar>{children}</Sidebar>
}
