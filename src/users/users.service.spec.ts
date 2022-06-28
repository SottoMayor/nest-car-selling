import { UsersService } from "./users.service";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { User } from './users.entity';

let service: UsersService;

describe('UsersService', () => {
    beforeEach(async () => {
        const users = [ { id: 1, email: 'foo@bar.com', password: 'password123'} ]

        const fakeUsersService = {
            create: () => {},
            findById: (id: number) => {},
            find: (email: string) => {},
            update: (id: number, updatedData: Partial<User>) => {},
            remove: (id: number) => {},
        };

        // Defining the module which we wanna work on
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: UsersService, 
                    useValue: fakeUsersService
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
})
