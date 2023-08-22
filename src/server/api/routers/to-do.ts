import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const todoRouter = createTRPCRouter({
    createTodo: publicProcedure
        .input(z.object({ title: z.string().min(5).max(15), description: z.string().min(10).max(20) }))
        .mutation(async ({ ctx, input }) => {
            try {
                const created = await ctx.prisma.todo.create({ data: input });
                console.log({ created });
                return { hello: 'hellod' };
            } catch (err) {
                console.error(err);
            }
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany();
    }),
});
