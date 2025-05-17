import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    // Public routes
    if (['/auth/login', '/auth/register', '/auth/forgot-password'].includes(path)) {
        return token
            ? NextResponse.redirect(new URL('/home', request.url))
            : NextResponse.next()
    }

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const role = request.cookies.get('role')?.value

    // Handle root home path
    if (path === '/home') {
        switch (role) {
            case 'admin':
                return NextResponse.redirect(new URL('/home/dashboard', request.url))
            case 'penyuluh':
                return NextResponse.redirect(new URL('/home/dashboard', request.url))
            case 'distributor':
                return NextResponse.redirect(new URL('/home/dashboard', request.url))
            case 'user':
                return NextResponse.redirect(new URL('/home/dashboard', request.url))
            default:
                return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/home/:path*',
        '/auth/:path*'
    ]
}