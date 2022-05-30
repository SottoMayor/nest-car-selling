import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

type CreateUserType = {
    email: string
    password: string
}

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    create(body: CreateUserType){
        const { email, password } = body;

        const user = this.userRepository.create({ email, password });

        return this.userRepository.save(user);
    }

}
