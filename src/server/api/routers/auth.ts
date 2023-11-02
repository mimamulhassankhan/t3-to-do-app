import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/api/trpc';
import { hash } from 'bcrypt';

// create a function that returns a random number between 0 and 99999 as a string of 5 digits
// add prefix to return a string of 5 digits

const random5DigitNumber = () =>
    'accoutn-'.concat(
        Math.floor(Math.random() * 100000)
            .toString()
            .padStart(5, '0')
    );

export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(
            z.object({
                email: z
                    .string()
                    .min(1, { message: 'This field has to be filled.' })
                    .email('This is not a valid email.'),
                name: z.string().min(1, { message: 'This field has to be filled.' }),
                password: z.string().min(4, { message: 'Password must be at least 8 characters long.' }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // use bycrpt to hash the password
            const pass = await hash(input.password, 10);

            return ctx.prisma.user.create({
                data: {
                    ...input,
                    accounts: {
                        create: [
                            {
                                type: 'user',
                                provider: 'credentials',
                                providerAccountId: random5DigitNumber(),
                                password: pass,
                            },
                        ],
                    },
                    sessions: {
                        create: [
                            {
                                ...ctx.session,
                                expires: Date.parse(ctx.session?.expires ?? '')
                                    ? new Date(ctx.session?.expires ?? '')
                                    : new Date(),
                                sessionToken: ctx.session?.user.accessToken ?? '',
                            },
                        ],
                    },
                },
                include: {
                    sessions: true,
                    accounts: true,
                },
            });
        }),
});
