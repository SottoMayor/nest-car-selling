import { BadRequestException, NotFoundException, UnprocessableEntityException ,Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private configService: ConfigService){}

    async signup(body: CreateUserDto) {
        const { email, password } = body;
        
        const users = await this.usersService.find(email);
        console.log('ok!')
        if(users.length > 0){
            throw new BadRequestException('This email is already in use!');
        }
        const hashedPassword = await hash(password, 12);
        
        const newUser = await this.usersService.create({ email, password: hashedPassword });
        
        return newUser;
    }

    async signin(body: CreateUserDto) {
        // How to consume env vars inside the project...
        const db = this.configService.get<string>('DB_NAME');
        console.log(`Signin method running in the ${db} database...`);

        // Right after this line, the business logic...
        const { email, password } = body;

        const users = await this.usersService.find(email);
        if(users.length === 0){
            throw new NotFoundException('This email not exist!');
        }

        const passwordMatch = await compare(password, users[0].password);
        if(!passwordMatch){
            throw new UnprocessableEntityException('This password is not correct!');
        }

        return users[0];
    }
}
