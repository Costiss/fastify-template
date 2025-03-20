import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from '../model';

export const selectUserSchema = createSelectSchema(users);
export type User = Zod.infer<typeof selectUserSchema>;

export const insertUserSchema = createInsertSchema(users);
export type InsertUser = Zod.infer<typeof insertUserSchema>;
