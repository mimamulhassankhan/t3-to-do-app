import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

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

    getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        try {
            const todo = await ctx.prisma.todo.findUnique({
                where: {
                    id: input.id,
                },
            });
            return todo;
        } catch (err) {
            console.error(err);
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Something went wrong' });
        }
    }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany();
    }),

    deleteById: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const res = await ctx.prisma.todo.delete({ where: { id: input.id } })
        if (res) return { success: true }
        return { success: false }
    })
});
