// import withAuth from 'next-auth/middleware';
// import { NextResponse } from 'next/server';
// // import { NextRequestWithAuth } from 'next-auth/middleware';

// export default withAuth(
//   // function middleware(req: NextRequestWithAuth) {
//   function middleware() {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl;

//         // Public routes that don't need authentication
//         if (
//           // pathname === '/' ||
//           pathname === '/login' ||
//           pathname === '/register' ||
//           pathname.startsWith('/api/auth') ||
//           pathname.startsWith('/api/videos')
//         ) {
//           return true;
//         }

//         // Explicitly check for dashboard and studio routes
//         if (
//           pathname.startsWith('/dashboard') ||
//           pathname.startsWith('/studio')
//         ) {
//           return !!token;
//         }

//         // All other routes require authentication
//         return !!token;
//       },
//     },
//   },
// );

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/studio/:path*',
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuth = !!token;
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/api/auth',
    '/api/videos',
    '/_next',
    '/favicon.ico',
  ];

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If it's a public route, allow access
  if (isPublicRoute) {
    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (isAuth && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (!isAuth) {
    const from = pathname + request.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes (handled by publicRoutes check)
     * - static files
     * - image optimization files
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
