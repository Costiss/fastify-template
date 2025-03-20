import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { UserService } from './user.service';
import { asClass } from 'awilix';
import { UsersControllerV1 } from './controller';
import { Version } from '../utils/version';

declare global {
    interface Dependencies {
        userService: UserService;
    }
}

export const UsersModule: FastifyPluginAsyncZod = async (fastify) => {
    fastify.dependencies.register({
        userService: asClass(UserService).scoped()
    });

    await fastify.register(UsersControllerV1, { prefix: Version.V1 });
};
