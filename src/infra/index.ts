import { DatabasePlugin } from './database';
import { ErrorsHandlerPlugin } from './errors';
import { HealthcheckRoute } from './healthcheck';
import { LoggerFastifyPlugin } from './logger/plugin';
import { OpenAPIFastifyPlugin } from './openapi';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fp from 'fastify-plugin';
import { DependencyInjectionPlugin } from './di';

export const InfraModule = fp(async (fastify) => {
    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    await fastify.register(DependencyInjectionPlugin);

    await fastify.register(DatabasePlugin);
    await fastify.register(LoggerFastifyPlugin);
    await fastify.register(ErrorsHandlerPlugin);
    await fastify.register(OpenAPIFastifyPlugin);
    await fastify.register(HealthcheckRoute);
});
