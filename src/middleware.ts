import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        console.log('middleware', req.nextUrl.pathname);
        // if (req.nextUrl.pathname.startsWith('/dashboard') && !req.nextauth.token)
        //     return NextResponse.rewrite('/login', req);
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            },
        },
    }
);

export const config = { matcher: ['/dashboard', '/todo/:path*'] };
