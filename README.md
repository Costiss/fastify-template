# Fastify Template

Fastify template for back-end http services using

-   [Fastify](https://www.fastify.io/) as the web framework
-   [Vitest](https://vitest.dev/) for testing
-   [Drizzle](https://drizzle.dev/) as ORM
-   [Awilix](https://github.com/jeffijoe/awilix) for dependency injection
-   [Zod](https://zod.dev/) for schema validation
-   [TypeScript](https://www.typescriptlang.org/) for type safety
-   [Bun](https://bun.sh) as the JavaScript runtime
-   [ESLint](https://eslint.org/) for linting
-   [Prettier](https://prettier.io/) for code formatting

To install dependencies:

```bash
bun install
```

To run:

```bash
docker compose up -d
bun dev
```

## Object Module Composition

The project uses object module composition to organize the codebase. Each module is a directory that contains the following files:

```
src/modules/users
├── index.ts                    # Module entry point
├── model                       # Data model
│   ├── index.ts
│   └── user.model.ts
├── router                      # HTTP routes
│   ├── index.ts
│   └── user.router.v1.ts
├── schema                      # Zod schemas
│   ├── index.ts
│   └── user.schema.ts
└── services                    # Business logic
    └── user-service
        ├── create-user.ts
        ├── get-by-id.ts
        ├── index.ts
        └── list-users.t
```

Example for declaring the user module

```typescript
// user/services/user-service/index.ts
import { CreateUserCommand } from './create-user';
import { GetUserByIDCommand } from './get-by-id';
import { ListUsersCommand } from './list-users';

export type UserService = ReturnType<typeof UserService>;
export const UserService = (deps: Dependencies) => ({
    ...CreateUserCommand(deps),
    ...ListUsersCommand(deps),
    ...GetUserByIDCommand(deps)
});

// user/services/user-service/create-user.ts
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

// user/router/user.router.v1.ts
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export const UsersRouterV1: FastifyPluginCallbackZod = (fastify, _, done) => {
    const userService = fastify.dependencies.resolve('user_service');

    fastify.route({
        url: '/users',
        method: 'GET',
        handler: async (_, reply) => {
            const all = await userService.list();
            return reply.code(200).send(all);
        }
    });
})


// user/index.ts
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { asFunction } from 'awilix';
import { UsersRouterV1 } from './router';
import { UserService } from './services/user-service';

declare global {
    interface Dependencies {
        user_service: UserService;
    }
}

export const UsersModule: FastifyPluginAsyncZod = async (fastify) => {
    fastify.dependencies.register({
        user_service: asFunction(UserService)
    });

    await fastify.register(UsersRouterV1);
};

```
