'use client';

import { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Sidebar>{children}</Sidebar>;
}
