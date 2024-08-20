import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    id: serial('id'),
    name: text('name').notNull()
});
