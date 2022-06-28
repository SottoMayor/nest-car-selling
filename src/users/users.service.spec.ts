import { UsersService } from "./users.service";
import { Test } from "@nestjs/testing";
import { User } from './users.entity';
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

type FindOneQuery = { where: { id: number } }
type FindQuery = { where: { email: string } }

describe('UsersService', () => {
    let service: UsersService;
    beforeEach(async () => {
        const users: User[] = [{ id: 1, email: 'foo@bar.com', password: 'password123'} as User]; 

        const fakeUsersRepository = {
            create: ({ email, password }) => { 
                const user =  {id: Math.floor(Math.random() * 99), email, password} as User
                return Promise.resolve(user);
            },
            save: (user: User) => {
                const foundIndex = users.findIndex(userData => userData.id === user.id);
                if(foundIndex === -1){
                    users.push(user)
                    return Promise.resolve( user );
                }
                users[foundIndex] = user
                return Promise.resolve( user );
            },
            findOne: (queryObj: FindOneQuery) => {
                const { where: { id } } = queryObj;

                const user = users.find(user => user.id === id);
                return Promise.resolve(user);
            },
            find: (queryObj: FindQuery) => {
                const { where: { email } } = queryObj;
                const allUsers = users.filter(user => user.email === email);

                return Promise.resolve( allUsers );
            },
            remove: () => {},
        };

        // Defining the module which we wanna work on
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: fakeUsersRepository
                }
            ]
        }).compile()
    
        // Getting the specific instance of Auth service
       service = module.get<UsersService>(UsersService);
    })
    
    it('Can create an instance of Users service', async () => {
       // Arrange!
       expect(service).toBeDefined();
    })

    it('Creates a new User', async () => {
        const userData = { email: 'test@example.com', password: 'test123'}
        const user = await service.create(userData);

        expect(user).toBeDefined();
        expect(user.email).toBe('test@example.com');
        expect(Object.keys(user)).toHaveLength(3);
        expect(typeof user.password).toBe('string');
    })

    it('Throws a 404 error if the user does not exist', async () => {
        const user = service.findById(1000);

        await expect(user).rejects.toThrow(NotFoundException);
    })

    it('Returns an user with a given id', async () => {
        const user = await service.findById(1);

        expect(user).toBeDefined();
    })

    it('Returns an array of users, when the email was passed', async () => {
        const usersArray = await service.find('foo@bar.com');

        expect(usersArray.length).toBeGreaterThan(0)
    })

    it('Returns an empty array when the email not was found', async () => {
        const usersArray = await service.find('this_not_exist@test.com');
        console.log(usersArray)

        expect(usersArray).toHaveLength(0);
    })
})
