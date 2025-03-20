import type { FastifyInstance } from 'fastify';
import { beforeEach, describe, expect, test } from 'vitest';
import fastify from 'fastify';
import { ErrorsHandlerFastifyPlugin } from '.';
import { HttpError } from './http-error';
import { z } from 'zod';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

describe('[UNIT] FastifyErrorsHandlerPlugin', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = fastify();
        server.setValidatorCompiler(validatorCompiler);
        server.setSerializerCompiler(serializerCompiler);

        await server.register(ErrorsHandlerFastifyPlugin);
    });

    test('it should handle HttpError without payload correctly', () => {
        server.get('/', () => {
            throw new HttpError({
                statusCode: 409,
                message: 'Entity already exists'
            });
        });

        server.inject(
            {
                method: 'GET',
                url: '/'
            },
            (_, response) => {
                expect(response?.statusCode).toBe(409);
                expect(response?.body).toEqual('{"message":"Entity already exists"}');
            }
        );
    });

    test('it should handle HttpError with payload correctly', () => {
        server.get('/', () => {
            throw new HttpError({
                statusCode: 501,
                message: 'Custom Error',
                tag: 'CUSTOM_ERROR',
                payload: { custom: 'message' }
            });
        });

        server.inject(
            {
                method: 'GET',
                url: '/'
            },
            (_, response) => {
                expect(response?.statusCode).toBe(501);
                expect(response?.json()).toEqual({
                    custom: 'message',
                    message: 'Custom Error',
                    tag: 'CUSTOM_ERROR'
                });
            }
        );
    });

    test('it should handle ZodError correctly', () => {
        server.route({
            method: 'POST',
            url: '/',
            schema: {
                body: z.object({ number: z.number() })
            },
            handler: async (_, res) => res.code(200)
        });

        server.inject(
            {
                method: 'POST',
                url: '/',
                body: { number: 'not a number' }
            },
            (_, response) => {
                expect(response?.statusCode).toBe(400);
                expect(response?.json()).toEqual({
                    error: 'Response Validation Error',
                    message: 'body/number Expected number, received string',
                    statusCode: 400
                });
            }
        );
    });

    test('it should handle other errors correctly', () => {
        server.route({
            method: 'GET',
            url: '/',
            handler: () => {
                throw new Error('some error');
            }
        });

        server.inject(
            {
                method: 'GET',
                url: '/'
            },
            (_, response) => {
                expect(response?.statusCode).toBe(500);
                expect(response?.json()).toEqual({
                    message: 'some error',
                    name: 'Error'
                });
            }
        );
    });
});
