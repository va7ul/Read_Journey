import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');
  const isPrivatePage = !isAuthPage;

  if (!token && isPrivatePage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/library/:path*', '/reading/:path*', '/login', '/register'],
};
