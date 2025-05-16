// import { GoogleClientId, GoogleClientSecret, NextAuthSecret } from '@/config';
// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// // import { verifyPassword } from './bcrypt';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error('Missing email or password');
//         }

//         try {
//            const user = await User.findOne({email: credentials.email})
//            if(!user) {
//              throw new Error("No User Found")
//            }
//            const isPasswordValid = await verifyPassword(
//             credentials.password,
//              user.password,
//            );

//            if (!isPasswordValid) {
//              throw new Error('');
//            }

//           return {
//             id: 'sds',
//           };
//         } catch {
//           throw new Error('');
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: GoogleClientId!,
//       clientSecret: GoogleClientSecret!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//       }

//       return session;
//     },
//   },

//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   secret: NextAuthSecret,
// };

import { GoogleClientId, GoogleClientSecret, NextAuthSecret } from '@/config';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Optional: your DB functions to check or create users
// import { getUserByEmail, createUser } from '@/lib/user-service'; // Adjust to your actual service location

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
          // Example: Find user from DB and verify password (uncomment and implement)
          // const user = await getUserByEmail(credentials.email);
          // if (!user) throw new Error('No user found');
          // const isValid = await verifyPassword(credentials.password, user.password);
          // if (!isValid) throw new Error('Invalid password');

          // Temporary hardcoded user (for dev/demo)
          return { id: 'sds', email: credentials.email };
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
      clientId: GoogleClientId!,
      clientSecret: GoogleClientSecret!,
    }),
  ],

  callbacks: {
    /**
     * 🧠 JWT Callback
     * Called on login or token refresh. Used to persist user info in token.
     */
    // async jwt({ token, user, account, profile }) {
    async jwt({ token, user }) {
      // If user logs in with credentials
      if (user) {
        token.id = user.id;
      }

      // If user logs in with Google, check DB and create user if needed
      // if (account?.provider === 'google' && profile?.email) {
      // const existingUser = await getUserByEmail(profile.email);
      //   if (!existingUser) {
      //     const newUser = await createUser({
      //       email: profile.email,
      //       name: profile.name,
      //       image: profile.picture,
      //       provider: 'google',
      //     });
      //     token.id = newUser.id;
      //   } else {
      //     token.id = existingUser.id;
      //   }
      // }

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
  secret: NextAuthSecret,
};
