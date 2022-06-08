import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from './users.controller';
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from './users.entity';

describe("Users controller", () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;
    let allUsers: User[];

    beforeEach( async () => {

        fakeAuthService = {
            signin: ({ email, password }) => Promise.resolve( { email: email, id: 1} as User ),
            signup: ({ email, password }) => Promise.resolve({ email, password, id: 1 } as User)
        }

        allUsers = [
            { id: 1, email: 'foo@bar.com', password: 'password123'} as User, 
            { id: 2, email: 'bar@foo.com', password: 'password321'} as User
        ];
        fakeUsersService = {
            findById: (id: number) => {
                const user = allUsers.find(user => user.id === id);
                return Promise.resolve(user);
            },
            find: (email: string) => {
                const filteredUsers = allUsers.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            update: (id: number, body: Partial<User>) => {
                const user = allUsers.find(user => user.id === id);
                const updatedUser = Object.assign(user, body);
                return Promise.resolve(updatedUser);
            },
            remove: (id: number) => {
                const foundUser = allUsers.find(user => user.id === id);
                allUsers = allUsers.filter(user => user.id !== id);
                return Promise.resolve(foundUser);
            },
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService
                }
        ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    })

    it('Should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('FindUsers return a list of users with a given email', async () => {
        const users = await controller.findUsers('foo@bar.com');

        expect(users.length).toBeGreaterThanOrEqual(1);
        expect(users[0].email).toEqual('foo@bar.com');
    })

    it('FindUserById should return an (user) object', async () => {
        const user = await controller.findUserById('2');

        expect(user).toBeDefined();
    })

    it('updateUser should pass partially update data to user', async () => {
        const user = await controller.updateUser('1', { email: 'foo@test.com' })

        expect(user).toBeDefined();
        expect(user.email).toBe('foo@test.com');
        expect(user.password).toBeDefined();
        expect(user.password).toBe('password123');
    })

    it('updateUser should pass a complete user update', async () => {
        const user = await controller.updateUser('2', { email: 'foo@test123.com', password: 'password_secret'});

        expect(user).toBeDefined();
        expect(user.email).toBe('foo@test123.com');
        expect(user.password).toBe('password_secret');
    })

    it('removeUser should be able to remove and return the user', async () => {
        const user = await controller.removeUser('2');

        expect(allUsers).toHaveLength(1);
        expect(user.id).toBe(2)
    })

    it('Signin updates session object and returns an user object', async () => {
        const session = { userId: 250 };
        const user = await controller.Signin({ email: 'foo@bar.com', password: 'password123'}, session);

        expect(user.id).toBe(1);
        expect(session.userId).toBe(1);
    })

    it('createUser updates a session object and returns an user object', async () => {
        const session = { userId: 349 };
        const user = await controller.createUser({ email: 'foo@bar.com', password: 'password123' }, session);

        expect(user).toBeDefined();
        expect(user.id).toBe(1);
        expect(session.userId).toBe(1);
    })

    it('whoAmI return an user object', async () => {
        const user = await controller.whoAmI({ email: 'foo@bar.com', id: 1} as User);

        expect(user).toBeDefined();
        expect(user.id).toBe(1);
        expect(user.email).toBe('foo@bar.com');
    })

    it('signout updates to null the session object', async () => {
        const session = { userId: 1 };
        await controller.signout(session);

        expect(session.userId).toBeNull();
    })

})