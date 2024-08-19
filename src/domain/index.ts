import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { UsersRouter } from './users';

export const DomainApp: FastifyPluginAsyncZod = async (fastify) => {
    await fastify.register(UsersRouter);
};
