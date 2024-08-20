import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { getEnv } from '../../domain/utils/env';
import fp from 'fastify-plugin';
import * as schema from '../../schema/schema';
import { asValue } from 'awilix';

const client = new Client({
    connectionString: getEnv('DATABASE_URL')
});
export type Database = typeof db;
export const db = drizzle(client, { schema });

await client.connect();

export const DatabaseFastifyPlugin = fp((fastify, _, done) => {
    fastify.diContainer.register({ db: asValue(db) });
    done();
});
