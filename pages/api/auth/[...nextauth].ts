import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import {
  LoginResponseDto,
  LoginRequestDto,
  login,
} from '@/networking/services/login';

const SECRET = process.env.NEXT_AUTH_SECRET;

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/auth/sign-in',
  },
  secret: SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user?.token) {
        return true;
      }
      return false;
    },
    // async jwt({ user }) {
    //   // if (user && user?.token) {
    //   //   token. = user.token as string;
    //   //   token.email = user.email;
    //   //   token.id = user.id;
    //   // }
    //   return user;
    // },
    // async session({ session, token }) {
    //   session.token = token.accessToken || '';
    //   return session;
    // },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      // @ts-expect-error error
      async authorize({
        username,
        password,
      }: LoginRequestDto): Promise<LoginResponseDto | null> {
        try {
          const res = await login({ username, password });

          const user = res.data;

          if (user) {
            return user;
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const errors = JSON.stringify(error.response.data);
            throw new Error(errors);
          }

          throw new Error('Invalid credentials');
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authConfig);
