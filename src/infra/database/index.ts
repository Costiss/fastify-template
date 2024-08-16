import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { getEnv } from '../../domain/utils/env';
import fp from 'fastify-plugin';

const client = new Client({
    connectionString: getEnv('DATABASE_URL')
});

await client.connect();
const db = drizzle(client);

declare module 'fastify' {
    interface FastifyRequest {
        db: typeof db;
    }
}

export const DatabaseFastifyPlugin = fp((fastify, _, done) => {
    fastify.decorateRequest('db', db);
    done();
});
