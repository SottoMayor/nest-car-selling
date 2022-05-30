import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    console.log(body);
    
  }
}
