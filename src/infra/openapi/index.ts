import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const OpenAPIFastifyPlugin = fp(async (fastify) => {
    await fastify.register(fastifySwagger, {
        transform: jsonSchemaTransform,
        openapi: {
            info: {
                title: 'My API',
                description: 'API documentation',
                version: '1.0.0'
            },
            servers: [{ url: 'http://localhost:3000' }]
        }
    });

    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs'
    });
});
