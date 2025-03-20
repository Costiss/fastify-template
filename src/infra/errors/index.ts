import fp from 'fastify-plugin';
import { z } from 'zod';
import { HttpError } from './http-error';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const ErrorResponseSchema = z
    .object({
        message: z.string(),
        tag: z.optional(z.string())
    })
    .and(z.record(z.string(), z.any()));

export type BadRequestResponse = z.infer<typeof ErrorResponseSchema>;
export const BadRequestResponseSchema = z.object({
    error: z.string(),
    message: z.string().or(z.unknown()),
    statusCode: z.optional(z.string().or(z.number()))
});

export const ErrorsHandlerPlugin = fp((fastify, _, done) => {
    fastify.setErrorHandler(async (error, _, reply) => {
        if (error.name === 'HttpError' || error instanceof HttpError) {
            const httpError = error as HttpError;
            return reply.code(httpError.statusCode).send({
                message: httpError.message,
                tag: httpError.tag,
                ...(httpError.payload ? httpError.payload : {})
            });
        } else if (hasZodFastifySchemaValidationErrors(error)) {
            fastify.log.warn('request validation error: %o', error);

            return reply.code(400).send({
                error: 'Response Validation Error',
                message: error.message,
                statusCode: 400
            });
        }

        fastify.log.error('unexpected error: %o', error);
        return reply.code(500).send({
            message: error.message,
            name: error.name
        });
    });

    done();
});
