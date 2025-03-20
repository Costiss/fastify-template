import { asFunction, createContainer, type AwilixContainer } from 'awilix';
import fp from 'fastify-plugin';
import type pino from 'pino';
import { Logger } from '../logger';

declare global {
    interface Dependencies {
        logger: pino.Logger;
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        dependencies: AwilixContainer<Dependencies>;
    }
}

export const DependencyInjectionPlugin = fp((fastify, _, done) => {
    const container = createContainer({
        strict: true
    });

    container.register({
        logger: asFunction(Logger).disposer((l) => l.removeAllListeners())
    });

    fastify.decorate('dependencies', container);
    done();
});
