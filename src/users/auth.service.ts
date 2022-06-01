import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { hash } from 'bcrypt';
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

    signin() {}
}
