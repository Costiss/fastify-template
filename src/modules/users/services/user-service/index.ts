import { CreateUserCommand } from './create-user';
import { GetUserByIDCommand } from './get-by-id';
import { ListUsersCommand } from './list-users';

export type UserService = ReturnType<typeof UserService>;
export const UserService = (deps: Dependencies) => ({
    ...CreateUserCommand(deps),
    ...ListUsersCommand(deps),
    ...GetUserByIDCommand(deps)
});
