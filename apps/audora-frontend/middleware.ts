// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

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
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (!isAuth) {
    const from = pathname + req.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
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
