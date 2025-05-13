import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const protectedRoutes = ['/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    try {
      verify(token, JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      request.cookies.delete('token');
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  if (pathname === '/auth') {
    const token = request.cookies.get('token')?.value;

    if (token) {
      try {
        verify(token, JWT_SECRET!);
        return NextResponse.redirect(new URL('/', request.url));
      } catch (error) {
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/auth'],
};
