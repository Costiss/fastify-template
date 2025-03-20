import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { UsersModule } from './users';

export const AppModules: FastifyPluginAsyncZod = async (fastify) => {
    await fastify.register(UsersModule);
};
