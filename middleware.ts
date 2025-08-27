import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated for protected routes
  const isAuthPage = request.nextUrl.pathname === '/login'
  const isProtectedRoute = !isAuthPage

  if (isProtectedRoute) {
    // Check for authentication in cookies or headers
    const authCookie = request.cookies.get('mockSession')
    
    if (!authCookie) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    try {
      // Validate session if cookie exists
      const session = JSON.parse(authCookie.value)
      if (!session.expires_at || session.expires_at <= Date.now()) {
        // Session expired, redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('mockSession')
        return response
      }
    } catch (error) {
      // Invalid session data, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('mockSession')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}