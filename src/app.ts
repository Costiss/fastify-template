import Fastify from 'fastify';
import { Logger } from './infra/logger';
import { DomainApp } from './domain';
import { InfraestructurePlugin } from './infra';

export async function Application() {
    const server = Fastify({
        loggerInstance: Logger()
    });

    await server.register(InfraestructurePlugin);
    await server.register(DomainApp);

    return server;
}
