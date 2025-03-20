import { DatabasePlugin } from './database';
import { ErrorsHandlerPlugin } from './errors';
import { HealthcheckRoute } from './healthcheck';
import { LoggerFastifyPlugin } from './logger/plugin';
import { OpenAPIFastifyPlugin } from './openapi';
import { fastifyAwilixPlugin as DIFastifyPlugin } from '@fastify/awilix';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fp from 'fastify-plugin';

export const InfraestructurePlugin = fp(async (fastify) => {
    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    await fastify.register(OpenAPIFastifyPlugin);
    await fastify.register(DIFastifyPlugin);
    await fastify.register(DatabasePlugin);
    await fastify.register(LoggerFastifyPlugin);
    await fastify.register(ErrorsHandlerPlugin);
    await fastify.register(HealthcheckRoute);
});
