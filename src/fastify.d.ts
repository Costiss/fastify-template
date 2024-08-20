import '@fastify/awilix';
import type { UserService } from './domain/users/user.service';
import type { Database } from './infra/database';

declare module '@fastify/awilix' {
    interface Cradle {
        db: Database;
        userService: InstanceType<UserService>;
    }
}
