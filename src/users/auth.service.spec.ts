import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { User } from './users.entity';
import { BadRequestException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";

let service: AuthService;
let fakeUsersService: Partial<UsersService>

describe('AuthService', () => {
    beforeEach(async () => {
        // For all these tests, we need always to this peace of code down there... This will be initialized before our tests.
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: ({email, password}) => {
                const newUser =  { id: Math.floor(Math.random() * 999), email: email, password: password} as User;
                users.push(newUser);
                return Promise.resolve(newUser);
            }
        }
    
        // Defining the module which we wanna work on
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                ConfigService, // We need include this in ours tests if we are using env vars!
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
                
            ]
        }).compile()
    
        // Getting the specific instance of Auth service
       service = module.get<AuthService>(AuthService);
    })
    
    it('Can create an instance of Auth service', async () => {
       // Arrange!
       expect(service).toBeDefined();
    })

    it('When the users is signup, the password hashing is working correctly', async () => {
        const input = { email: 'user@example.com', password: 'password123'}
        const user = await service.signup(input);

        // Arrange
        expect(user.password).not.toEqual(input.password);
    })

    it('Throws an error when the user signs up with a already existing email', async () => {
        // We wanna sign up the user first, the we wanna use this generated data to test the signup flow...

        await service.signup({ email: 'foo@bar.com', password: 'password123'})

        // Calling the signup method
        await expect(
            service.signup({ email: 'foo@bar.com', password: 'password123'})
        )
        .rejects
        .toThrow(BadRequestException);
    })

    it('Throws an error if any user is found with a given email', async () => {
        // Calling the signin method
        const call = service.signin({ email: 'foo@bar.com', password: 'password123'})
        await expect(call)
        .rejects
        .toThrowError(NotFoundException);
    })

    it('Throws an error if the password is incorrect', async () => {
        // We wanna sign up the user first, the we wanna use this generated data to test the signin flow...

        await service.signup({ email: 'foo@bar.com', password: 'password123'})

        // Calling the signin method
        const call = service.signin({ email: 'foo@bar.com', password: 'incorrect_password'});

        await expect(call).rejects.toThrowError(UnprocessableEntityException);
    })

    it('Returns an user if the correct password is provided', async () => {
        // The strategy is create an user, then the password will be hashed. right after we wanna signin the user
        // In this flow, the hashed password will be compare with original password! This is what we wanna do.

        // Creating an user
        await service.signup({ email: 'foo@bar.com', password: 'password123'})

        // Calling the signin method
        const user = await service.signin({ email: 'foo@bar.com', password: 'password123'});

        expect(user).toBeDefined();
    })
})
