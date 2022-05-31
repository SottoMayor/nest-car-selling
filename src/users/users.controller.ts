import { Controller, Post, Body, Get, Patch, Delete, Param, Query, UseInterceptors } from '@nestjs/common';
import { SerealizeInterceptor } from 'src/interceptors/serealize.interceptor';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUser } from './dtos/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseInterceptors(SerealizeInterceptor)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    // Converting the id from string to number
    const parsedId = parseInt(id);

    return await this.usersService.findById(parsedId);
  }

  @Get()
  async findUsers(@Query('email') email: string){
    return await this.usersService.find(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUser){
    const parsedId = parseInt(id);
    return await this.usersService.update(parsedId, body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string){
    const parsedId = parseInt(id);

    return await this.usersService.remove(parsedId);
  }
}
