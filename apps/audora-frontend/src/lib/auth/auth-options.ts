import { LoginUser, RegisterWithGoogle } from '@/actions/auth';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from '@/config';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    /**
     * 🔐 Credentials Provider
     * Used for email + password based login via your own UI.
     */
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
          if (!response.success) {
            throw new Error('Login failed');
          }
          return { id: response.user.id, email: credentials.email };
        } catch {
          throw new Error('Login failed');
        }
      },
    }),

    /**
     * 🔐 Google OAuth Provider
     * Allows login with Google. You must handle user persistence manually (in jwt callback).
     */
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /**
     * 🧠 JWT Callback
     * Called on login or token refresh. Used to persist user info in token.
     */

    async jwt({ token, user, account, profile }) {
      // If user logs in with credentials
      if (user) {
        token.id = user.id;
      }

      if (account?.provider === 'google' && profile?.email) {
        const response = await RegisterWithGoogle({
          email: profile.email,
          name: profile.name || 'Google User',
        });
        if (response.success) {
          token.id = response.user.id;
        } else {
          throw new Error(response.message);
        }
      }

      return token;
    },

    /**
     * 📦 Session Callback
     * Called whenever a session is created or checked.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  /**
   * 🔑 Use JWT-based sessions (stateless, stored in client token)
   */
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  /**
   * 🎨 Custom pages to override NextAuth default UI
   */
  pages: {
    signIn: '/login', // Your custom login page
    error: '/login', // Redirect to login on auth errors
  },

  /**
   * 🧪 Secret used to encrypt session/JWT tokens
   */
  secret: NEXTAUTH_SECRET,
};
