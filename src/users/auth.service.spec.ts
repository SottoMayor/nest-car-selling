import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { Test } from "@nestjs/testing";
import { User } from './users.entity';

let service: AuthService;

describe('AuthService', () => {
    beforeEach(async () => {
        // For all these tests, we need always to this peace of code down there... This will be initialized before our tests.
        const fakeUsersService: Partial<UsersService> = {
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
    
    it('Can create an instance of Auth service?', async () => {
       // Arrange!
       expect(service).toBeDefined();
    })
})
