import { Injectable, NotFoundException } from '@nestjs/common';
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

    findById(id: number) {
        const user = this.userRepository.findOneBy({ id });
        if(!user){
            throw new NotFoundException('This user does not exist.');
        }

        return user;
    }

    find(email: string) {
        // If not exists, this will return a empty array...
        const users = this.userRepository.find({ where: { email } });

        return users;
    }

    updated() {}

    remove() {}
}
