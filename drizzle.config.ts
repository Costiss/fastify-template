import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/infra/database/schema.ts',
    out: './migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? ''
    }
});
