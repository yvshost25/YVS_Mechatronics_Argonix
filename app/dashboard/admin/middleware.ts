// filepath: c:\Users\sunka\Downloads\Argonix_Project1\middleware.ts
import { NextResponse, NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const role = req.headers.get("x-role") // Assume role is passed in headers

  // Restrict access to admin routes
  if (url.pathname.startsWith("/dashboard/admin") && role !== "admin") {
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}