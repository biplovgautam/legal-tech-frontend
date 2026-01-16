import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token');

  // Protect all routes under /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = new URL('/signin', request.url);
      // Optional: Add reason or return URL
      return NextResponse.redirect(url);
    }
  }
  
  // Redirect authenticated users away from /signin and /signup
  // DISABLED to prevent infinite loops if the token is invalid (401 from backend).
  // The Signin page itself handles redirection if the user is successfully authenticated.
  /* 
  if (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
};
