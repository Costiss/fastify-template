import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import type { UserService } from './user.service';
import { insertUserSchema, selectUserSchema } from './schema';
import { z } from 'zod';

const OPENAPI_TAGS = ['users'];

export const UsersControllerV1: FastifyPluginCallbackZod = (fastify, _, done) => {
    const userService = fastify.dependencies.resolve<UserService>('userService');

    fastify.route({
        url: '/users',
        method: 'GET',
        schema: {
            tags: OPENAPI_TAGS,
            response: {
                200: z.array(selectUserSchema)
            }
        },
        handler: async (_, reply) => {
            const all = await userService.list();
            return reply.code(200).send(all);
        }
    });

    fastify.route({
        url: '/users/:id',
        method: 'GET',
        schema: {
            tags: OPENAPI_TAGS,
            params: z.object({
                id: z.coerce.number()
            }),
            response: {
                200: selectUserSchema
            }
        },
        handler: async ({ params }, reply) => {
            const user = await userService.getByID(Number(params.id));
            return reply.code(200).send(user);
        }
    });

    fastify.route({
        url: '/users',
        method: 'POST',
        schema: {
            tags: OPENAPI_TAGS,
            body: insertUserSchema,
            response: {
                201: selectUserSchema
            }
        },
        handler: async ({ body }, reply) => {
            const user = await userService.create(body);
            return reply.code(201).send(user);
        }
    });

    done();
};
