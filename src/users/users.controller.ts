import { Controller, Post, Body, Get, Patch, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('/:id')
  findUserById(@Param('id') id: string) {
    // Converting the id from string to number
    const parsedId = parseInt(id);

    return this.usersService.findById(parsedId);
  }

  @Get()
  findUsers(@Query('email') email: string){
    return this.usersService.find(email);
  }
}
