import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from '../../schema/schema';

export const selectUserSchema = createSelectSchema(users);
export type TUser = Zod.infer<typeof selectUserSchema>;

export const insertUserSchema = createInsertSchema(users);
export type TInsertUser = Zod.infer<typeof insertUserSchema>;
