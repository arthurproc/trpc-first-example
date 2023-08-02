import { initTRPC } from '@trpc/server';
import * as yup from 'yup';
import { todos } from '../data/todo';

export const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return { message: 'Hello World!' };
  }),
  todo: t.router({
    create: t.procedure
      .input(
        yup.object({
          text: yup.string().required(),
        }),
      )
      .mutation(({ input }) => {
        const todo = {
          id: Date.now().toString(),
          text: input.text,
          completed: false,
        };
        todos.push(todo);
        return todo;
      }),
    toggle: t.procedure
      .input(
        yup.object({
          id: yup.string().required(),
        }),
      )
      .mutation(({ input }) => {
        const todo = todos.find((todo) => todo.id === input.id);
        if (!todo) {
          throw new Error(`Todo with id "${input.id}" not found`);
        }
        todo.completed = !todo.completed;
        return todo;
      }),
    remove: t.procedure
      .input(
        yup.object({
          id: yup.string().required(),
        }),
      )
      .mutation(({ input }) => {
        const index = todos.findIndex((todo) => todo.id === input.id);
        if (index === -1) {
          throw new Error(`Todo with id "${input.id}" not found`);
        }
        todos.splice(index, 1);
        return input.id;
      }),
    getMany: t.procedure.query(() => todos),
    getById: t.procedure
      .input(
        yup.object({
          id: yup.string().required(),
        }),
      )
      .query(({ input }) => {
        const todo = todos.find((todo) => todo.id === input.id);
        if (!todo) {
          throw new Error(`Todo with id "${input.id}" not found`);
        }
        return todo;
      }),
    }),
});

export type AppRouter = typeof appRouter;