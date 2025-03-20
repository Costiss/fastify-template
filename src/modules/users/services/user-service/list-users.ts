import type { User } from '../../schema';

export const ListUsersCommand = ({ db }: Dependencies) => ({
    async list(): Promise<User[]> {
        return db.query.users.findMany();
    }
});
