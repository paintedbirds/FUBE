'use client';

import { ReactNode } from 'react';

import { Sidebar } from '@/app/components/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Sidebar>{children}</Sidebar>
    // <Container maxWidth="100vw" height="100vh" margin="0" padding="0">
    //   <SideBar />
    //   {children}
    // </Container>
  );
}
