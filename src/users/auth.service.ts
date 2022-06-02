import { BadRequestException, NotFoundException, UnprocessableEntityException ,Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(body: CreateUserDto) {
        const { email, password } = body;
        
        const users = await this.usersService.find(email);
        if(users.length > 0){
            throw new BadRequestException('This email is already in use!');
        }
        const hashedPassword = await hash(password, 12);

        const newUser = await this.usersService.create({ email, password: hashedPassword });

        return newUser;
    }

    async signin(body: CreateUserDto) {
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
