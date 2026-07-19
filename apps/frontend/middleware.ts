import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  // Skeleton route guard - checks for access cookies.
  const token = request.cookies.get('sb-access-token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // If unauthenticated and path is not public, redirect to login page
  if (!token && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If authenticated and on auth path, redirect to user dashboard
  if (token && isPublicRoute && pathname !== '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Intercept all routes except public statics and favicon
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
