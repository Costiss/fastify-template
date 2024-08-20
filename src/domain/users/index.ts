import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { Cradle } from '@fastify/awilix';
import { UserService } from './user.service';
import { asFunction } from 'awilix';
import { UsersControllerV1 } from './controller';
import { Version } from '../utils/version';

export const UsersModule: FastifyPluginAsyncZod = async (fastify) => {
    fastify.diContainer.register({
        userService: asFunction((ctx: Cradle) => new UserService(ctx.db))
    });

    await fastify.register(UsersControllerV1, { prefix: Version.V1 });
};
