import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/api/trpc';

export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(
            z.object({
                email: z
                    .string()
                    .min(1, { message: 'This field has to be filled.' })
                    .email('This is not a valid email.'),
                name: z.string().min(1, { message: 'This field has to be filled.' }),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.create({
                data: {
                    ...input,
                    accounts: {
                        create: [{ type: 'user', provider: 'credentials', providerAccountId: '12345' }],
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
