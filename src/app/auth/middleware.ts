import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET not set in environment variables!');
}

const protectedRoutes = ['/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const token = request.cookies.get('token')?.value;

      if (!token) {
        return NextResponse.redirect(new URL('/auth', request.url));
      }

      try {
        verify(token, JWT_SECRET!);
        return NextResponse.next();
      } catch (error) {
        const response = NextResponse.redirect(new URL('/auth', request.url));
        response.cookies.delete('token');
        return response;
      }
    }

    if (pathname === '/auth') {
      const token = request.cookies.get('token')?.value;

      if (token) {
        try {
          verify(token, JWT_SECRET!);
          return NextResponse.redirect(new URL('/', request.url));
        } catch (error) {
          const response = NextResponse.next();
          response.cookies.delete('token');
          return response;
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/auth'],
};
