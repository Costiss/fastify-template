import Fastify from 'fastify';
import { logger } from './infra/logger';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { HealthcheckController } from './infra/healthcheck';
import { LoggerFastifyPlugin } from './infra/logger/plugin';
import { DomainApp } from './domain';
import { ErrorsHandlerFastifyPlugin } from './infra/errors';
import { DatabaseFastifyPlugin } from './infra/database';
import { fastifyAwilixPlugin as DIFastifyPlugin } from '@fastify/awilix';

const server = Fastify({ logger: logger, disableRequestLogging: true });
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

await server.register(DIFastifyPlugin);
await server.register(DatabaseFastifyPlugin);
await server.register(LoggerFastifyPlugin);
await server.register(ErrorsHandlerFastifyPlugin);
await server.register(HealthcheckController);
await server.register(DomainApp);

server.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});
