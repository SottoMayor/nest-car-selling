import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

}
