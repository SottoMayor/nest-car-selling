import { Controller, Post, Body, Get, Patch, Delete, Param, Query, UseInterceptors } from '@nestjs/common';
import { Serealize } from 'src/interceptors/serealize.interceptor';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUser } from './dtos/UpdateUser.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/User.dto';

// OBS: Serealize can be a decorator of method or class.
//      Depending which DTO you wanna use to send the response!

@Serealize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService){}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

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
