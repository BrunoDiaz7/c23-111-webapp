import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const role = req.cookies.get('rol');
    const {pathname} = req.nextUrl;

    if (token && (pathname === '/auth')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && (pathname.startsWith('/user'))) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    if (token && pathname.startsWith('/admin') && role?.value !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/auth', '/user/:path*', '/admin']
}