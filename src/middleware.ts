import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    // Public routes
    if (['/auth/login', '/auth/register'].includes(path)) {
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
                return NextResponse.redirect(new URL('/home/(penyuluh)/dashboard', request.url))
            case 'distributor':
                return NextResponse.redirect(new URL('/home/(distributor)/dashboard', request.url))
            case 'user':
                return NextResponse.redirect(new URL('/home/(user)/dashboard', request.url))
            default:
                return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    // const roleRoutes = {
    //     admin: [
    //         '/home/dashboard',
    //         '/home/submission',
    //         '/home/(admin)/users',
    //         '/home/(admin)/monitoring'
    //     ],
    //     penyuluh: [
    //         '/home/(penyuluh)/dashboard',
    //         '/home/(penyuluh)/monitoring',
    //         '/home/(penyuluh)/reports'
    //     ],
    //     distributor: [
    //         '/home/(distributor)/dashboard',
    //         '/home/(distributor)/products',
    //         '/home/(distributor)/orders'
    //     ],
    //     user: [
    //         '/home/(user)/dashboard',
    //         '/home/(user)/profile',
    //         '/home/(user)/plants'
    //     ]
    // }

    // const hasAccess = Object.entries(ROLE_ROUTES).some(([userRole, paths]) => {
    //     return role === userRole && paths.some(p => path.startsWith(p))
    // })

    // if (!hasAccess) {
    //     return NextResponse.redirect(new URL('/home', request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/home/:path*',
        '/auth/:path*'
    ]
}