import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { asFunction } from 'awilix';
import { UsersRouterV1 } from './router';
import { UserService } from './services/user-service';

declare global {
    interface Dependencies {
        user_service: UserService;
    }
}

export const UsersModule: FastifyPluginAsyncZod = async (fastify) => {
    fastify.dependencies.register({
        user_service: asFunction(UserService)
    });

    await fastify.register(UsersRouterV1);
};
