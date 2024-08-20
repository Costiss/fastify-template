import Fastify from 'fastify';
import { logger } from './infra/logger';
import { DomainApp } from './domain';
import { InfraestructurePlugin } from './infra';

const server = Fastify({ logger: logger, disableRequestLogging: true });

await server.register(InfraestructurePlugin);
await server.register(DomainApp);

export default server;
