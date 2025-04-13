import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || "user";

  const isAuthRoute = nextUrl.pathname.startsWith('/auth');
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
  
  // Redirect unauthenticated users to login page if trying to access dashboard
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  // Redirect authenticated users to dashboard if they try to access login page
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // For dashboard admin routes, check if user is admin
  if (nextUrl.pathname.startsWith('/dashboard/admin') && userRole !== "admin") {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // For dashboard user-specific routes, no additional checks needed
  // as the middleware already checks for authentication
  
  return NextResponse.next();
});

// Define which paths should be processed by the middleware
export const config = { 
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] 
};