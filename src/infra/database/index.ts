import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { getEnv } from '../../domain/utils/env';
import fp from 'fastify-plugin';
import * as schema from '../../schema/schema';
import { asValue } from 'awilix';

export type Database = NodePgDatabase<typeof schema>;

export const DatabasePlugin = fp(async (fastify) => {
    const pool = new Pool({ connectionString: getEnv('DATABASE_URL') });
    const db = drizzle(pool, { schema });

    await pool.connect();

    fastify.diContainer.register({ db: asValue(db) });
});
