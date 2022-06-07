import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { Test } from "@nestjs/testing";
import { User } from './users.entity';
import { BadRequestException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";

let service: AuthService;
let fakeUsersService: Partial<UsersService>

describe('AuthService', () => {
    beforeEach(async () => {
        // For all these tests, we need always to this peace of code down there... This will be initialized before our tests.
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: ({email, password}) => Promise.resolve({ id: 1, email: email, password: password} as User)
        }
    
        // Defining the module which we wanna work on
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                }
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
        // Modifying the mock with the purpose to find an array not empty of users
        fakeUsersService.find = () => (
            Promise.resolve([{ email: 'foo@bar.com', password: 'password123', id: 1} as User])
        )

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
        // We need mess around the fakeUsersService.find mock function to guarantee that has an user over there
        fakeUsersService.find = () => (
            Promise.resolve([{ email: 'foo@bar.com', password: 'password123'} as User])
        )

        // Calling the signin method
        const call = service.signin({ email: 'foo@bar.com', password: 'incorrect_password'});

        await expect(call).rejects.toThrowError(UnprocessableEntityException);
    })

    it('Returns an user if the correct password is provided', async () => {
        // This does not work!!!! Lets fix this...

        // We need mess around the fakeUsersService.find mock function to guarantee that has an user over there
        fakeUsersService.find = (
            () => Promise.resolve([{ email: 'foo@bar.com', password: 'password123'} as User])
        );

        // Calling the signin method
        const user = await service.signin({ email: 'foo@bar.com', password: 'password123'});

        expect(user).toBeDefined();
    })
})
