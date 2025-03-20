import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fp from 'fastify-plugin';
import { asValue } from 'awilix';
import { getEnv } from 'src/modules/utils/env';
import * as schema from './schema';

declare global {
    interface Dependencies {
        db: Database;
    }
}

export type Database = NodePgDatabase<typeof schema>;

export const DatabasePlugin = fp(async (fastify) => {
    const pool = new Pool({ connectionString: getEnv('DATABASE_URL') });
    const db = drizzle(pool, { schema });

    await pool.connect();

    fastify.dependencies.register({ db: asValue(db) });
});
