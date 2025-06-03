import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accessToken?: string;
      studioId?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    studioId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    studioId?: string;
  }
}
