import Fastify from 'fastify';
import { logger } from './infra/logger';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { HealthcheckController } from './infra/healthcheck';
import { DatabaseFastifyPlugin } from './infra/database';
import { LoggerFastifyPlugin } from './infra/logger/plugin';

const server = Fastify({ logger: logger, disableRequestLogging: true });
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

await server.register(LoggerFastifyPlugin);
// await server.register(DatabaseFastifyPlugin);
await server.register(HealthcheckController);

server.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});
