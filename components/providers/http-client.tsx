'use client';

import { useSession, signOut } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { httpClient } from '@/networking/http-client';
import {
  applyInterceptors,
  clearInterceptors,
} from '@/networking/auth-middleware';

export function HttpClient({ children }: { children: ReactNode }) {
  const session = useSession();

  const token = session.data?.user?.token;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (session.status === 'authenticated') {
        const interceptors = applyInterceptors(httpClient, token, signOut);

        return () => clearInterceptors(httpClient, interceptors);
      }
    }
  }, [session.status, token]);

  return <>{children}</>;
}
