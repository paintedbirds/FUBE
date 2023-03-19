'use client';

import { ReactNode } from 'react';

import { SideBar } from '@/app/components/sidebar';
import { Container } from '@chakra-ui/react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Container maxWidth="100vw" height="100vh" margin="0" padding="0">
      <SideBar />
      {children}
    </Container>
  );
}
