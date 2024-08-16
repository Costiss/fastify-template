import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const HealthcheckController: FastifyPluginCallbackZod = (fastify, _, done) => {
    fastify.route({
        url: '/healthcheck',
        method: 'GET',
        schema: {
            response: {
                200: z.object({ status: z.string() })
            }
        },
        handler: async (_, reply) => {
            return reply.code(200).send({ status: 'ok' });
        }
    });
    done();
};
