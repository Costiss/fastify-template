import { users } from '../../model';
import type { InsertUser, User } from '../../schema';

export const CreateUserCommand = ({ db }: Dependencies) => ({
    async create(data: InsertUser): Promise<User> {
        return db
            .insert(users)
            .values(data)
            .returning()
            .then((users) => users[0]);
    }
});
