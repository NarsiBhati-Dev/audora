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

          if (!response?.success || !response?.user) {
            console.error('Invalid response structure:', response);
            throw new Error('Invalid credentials');
          }

          return {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
          };
        } catch (error) {
          console.error('Login error:', error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('Invalid credentials');
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
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      if (account?.provider === 'google' && profile?.email) {
        const response = await RegisterWithGoogle({
          email: profile.email,
          name: profile.name || 'Google User',
        });
        if (response.success) {
          token.id = response.user.id;
          token.email = response.user.email;
          token.name = response.user.name;
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
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  /**
   * 🔑 Use JWT-based sessions (stateless, stored in client token)
   */
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
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

  // Add these options for better security
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Ensure cookies are properly handled
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
};
