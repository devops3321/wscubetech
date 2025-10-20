import { NextResponse } from 'next/server';

export function middleware(request) {

    if (! request.cookies.get('USER')) {
        return NextResponse.redirect(new URL('/login-register', request.url));
    }

    else {
        if (request.nextUrl.pathname.startsWith('/login-register')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/wishlist/:path*',
        '/checkout/:path*',
        '/cart/:path*',
    ]
};