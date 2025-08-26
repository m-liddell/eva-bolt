import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated for protected routes
  const isAuthPage = request.nextUrl.pathname === '/login'
  const isProtectedRoute = !isAuthPage

  if (isProtectedRoute) {
    // In a real app, you would check for valid session/token
    // For now, we'll just allow all requests through
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}