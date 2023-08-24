import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const z_Todo = z.object({
    id: z.string().min(4, 'Please enter a valid value').optional().or(z.literal('')),
    title: z.string().min(5).max(15),
    description: z.string().min(10).max(20),
});

export const todoRouter = createTRPCRouter({
    createTodo: publicProcedure.input(z_Todo).mutation(({ ctx, input }) => {
        return ctx.prisma.todo.create({ data: input });
    }),

    getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.todo.findUnique({
            where: {
                id: input.id,
            },
        });
    }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany();
    }),

    update: publicProcedure.input(z_Todo).mutation(({ ctx, input: { id, ...todo } }) => {
        return ctx.prisma.todo.update({ where: { id }, data: todo });
    }),

    deleteById: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
        return ctx.prisma.todo.delete({ where: { id: input.id } });
    }),
});
