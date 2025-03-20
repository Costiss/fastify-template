import Fastify from 'fastify';
import { Logger } from './infra/logger';
import { DomainApp } from './domain';
import { InfraestructurePlugin } from './infra';

const server = Fastify({
    loggerInstance: Logger()
});

await server.register(InfraestructurePlugin);
await server.register(DomainApp);

export default server;
