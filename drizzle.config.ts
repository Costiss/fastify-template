import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/schema/schema.ts',
    out: './migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? ''
    }
});
