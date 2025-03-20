import Fastify from 'fastify';
import { Logger } from './infra/logger';
import { InfraModule } from './infra';
import { AppModules } from './modules';

export async function Application() {
    const server = Fastify({
        loggerInstance: Logger()
    });

    await server.register(InfraModule);
    await server.register(AppModules);

    return server;
}
