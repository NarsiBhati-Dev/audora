import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (
          pathname.startsWith('/api/auth') ||
          pathname === '/login' ||
          pathname === '/register'
        ) {
          return true;
        }

        // public
        if (pathname === '/' || pathname.startsWith('/api/videos')) {
          return true;
        }
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
