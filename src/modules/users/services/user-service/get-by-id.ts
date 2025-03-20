import type { User } from '../../schema';

export const GetUserByIDCommand = ({ db }: Dependencies) => ({
    async getByID(id: number): Promise<User | undefined> {
        return db.query.users.findFirst({
            where: (fields, { eq }) => eq(fields.id, id)
        });
    }
});
