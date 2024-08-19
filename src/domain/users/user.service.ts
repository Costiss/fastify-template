import { db, type Database } from '../../infra/database';
import { users } from '../../schema/schema';
import type { TInsertUser, TUser } from './schema';

export class UserService {
    constructor(private readonly db: Database) {}

    async list(): Promise<TUser[]> {
        return this.db.select().from(users);
    }

    async getByID(id: number): Promise<TUser | undefined> {
        return this.db.query.users.findFirst({
            where(fields, { eq }) {
                return eq(fields.id, id);
            }
        });
    }

    async create(data: TInsertUser): Promise<TUser> {
        return this.db
            .insert(users)
            .values(data)
            .returning()
            .then((users) => users[0]);
    }
}

export const userService = new UserService(db);
