import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        console.log('nexauth middleware', req.nextauth)
        console.log('nextUrl middleware', req.nextUrl)
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                console.log('token middleware', token)
                return true
            },
        },
    }
)

export const config = { matcher: ["/dashboard", "/todo/:path*"] }