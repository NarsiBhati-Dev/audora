import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { verifyPassword } from './bcrypt';

export const authOptions: NextAuthOptions = {
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
          //const user = await User.findOne({email: credentials.email})
          // if(!user) {
          // throw new Error("No User Found")
          // }
          // const isPasswordValid = await verifyPassword(
          //   credentials.password,
          //   user.password,
          // );

          // if (!isPasswordValid) {
          //   throw new Error('');
          // }

          return {
            id: 'sds',
          };
        } catch {
          throw new Error('');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};
