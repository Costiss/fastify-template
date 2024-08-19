import fp from 'fastify-plugin';
import { z } from 'zod';
import { HttpError } from './http-error';

export type TErrorResponse = z.infer<typeof ErrorResponse>;

export const ErrorResponse = z.object({
    message: z.string()
});

export const ErrorsHandlerFastifyPlugin = fp((fastify, _, done) => {
    fastify.setErrorHandler(async (error, _, reply) => {
        if (error instanceof HttpError) {
            return reply.code(error.code).send(error.payload as never);
        }

        return reply.code(500).send({
            message: error.message,
            name: error.name
        });
    });

    done();
});
