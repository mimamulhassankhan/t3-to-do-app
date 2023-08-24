import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from '@/env.mjs';
import { prisma } from '@/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: DefaultSession['user'] & {
            id: string;
            // ...other properties
            // role: UserRole;
        };
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        jwt: ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: ({ session, token }) => {
            return { ...session, user: token };
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'jsmith@email.com' },
                password: { label: 'Password', type: 'password' },
            },
            authorize(credentials, req) {
                const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com', password: '12345' };

                if (user.email === credentials?.email && user.password === credentials.password) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
    secret: '%$$$SecRET$$$%',
    session: {
        strategy: 'jwt',
    },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext['req'];
    res: GetServerSidePropsContext['res'];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
