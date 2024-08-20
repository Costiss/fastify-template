import Fastify from 'fastify';
import { logger } from './infra/logger';
import { DomainApp } from './domain';
import { InfraestructurePlugin } from './infra';

const server = Fastify({ logger: logger, disableRequestLogging: true });

await server.register(InfraestructurePlugin);
await server.register(DomainApp);

server.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});
