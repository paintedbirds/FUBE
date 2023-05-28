// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth/next';
import { User } from '@/utils/types';

declare module 'next-auth' {
  interface UserAuth extends User {
    token: string;
    model_perms: string[];
    group_names: string[];
  }

  interface Session {
    user: UserAuth;
    token: string;
  }
}
