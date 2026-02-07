import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const refreshToken = request.cookies.get('refreshToken')?.value

    const isAuthRoute = pathname.startsWith('/signin') || pathname.startsWith('/signup') || pathname.startsWith('/onboarding');
    const isProtectedRoute = pathname.startsWith('/dashboard');

    if (isProtectedRoute && !refreshToken) {
        const url = new URL('/signin', request.url)
        return NextResponse.redirect(url)
    }

    if (isAuthRoute && refreshToken) {
        const url = new URL('/dashboard', request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
