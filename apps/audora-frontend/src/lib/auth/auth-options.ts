import { LoginUser, RegisterWithGoogle } from '@/actions/auth';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from '@/config';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password');
        }

        try {
          const response = await LoginUser({
            email: credentials.email,
            password: credentials.password,
          });

          if (!response?.success || !response?.user) {
            throw new Error('Invalid credentials');
          }

          return {
            ...response.user,
            accessToken: response.accessToken,
            studioSlug: response.studioSlug,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('Invalid credentials');
        }
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Initial sign in
        token = {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          studioSlug: user.studioSlug,
        };
      }

      if (account?.provider === 'google' && profile?.email) {
        const response = await RegisterWithGoogle({
          email: profile.email,
          name: profile.name || 'Google User',
        });

        if (response.success) {
          token = {
            ...token,
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            accessToken: response.accessToken,
            studioSlug: response.studioSlug,
          };
        } else {
          console.error('Google sign-in failed');
          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      const sessionData = {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
          accessToken: token.accessToken,
          studioSlug: token.studioSlug,
        },
      };

      return sessionData;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

  secret: NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
    error: '/login',
  },

  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
};
export default authOptions;
