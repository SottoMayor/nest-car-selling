import { Controller, Post, Body, Get, Patch, Delete, Param, Query, Session } from '@nestjs/common';
import { Serealize } from '../interceptors/serealize.interceptor';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUser } from './dtos/UpdateUser.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/User.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { IsAuth } from './decorators/user-auth.decorator';
import { ApiQuery, ApiParam, ApiOperation, ApiTags, ApiHeader, ApiOkResponse  } from '@nestjs/swagger';

// OBS: Serealize can be a decorator of method or class.
//      Depending which DTO you wanna use to send the response!

@ApiTags('Auth')
@Serealize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService){}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id
    return user;
  }

  @Post('/signin')
  async Signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   return await this.usersService.findById(session.userId);
  // }
  @Get('/whoami')
  @IsAuth()
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  //@ApiHeaders([{}, ..., {}])
  @ApiHeader({
      name: 'Content-Type',
      description: 'Set the app content type',
      example: 'application/json'
    })
  @ApiParam({name: 'id', description: 'Search an user by the given id.', example: 1})
  @ApiOperation({ summary: 'Find an user by ID',description: 'Some description here!' })
  @ApiOkResponse({ type: UserDto, description: 'The user was successfully retrieved.'})
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    // Converting the id from string to number
    const parsedId = parseInt(id);

    return await this.usersService.findById(parsedId);
  }

  @ApiQuery({name: 'email', description: 'Search all users with this given email', example: 'test@test.com',  })
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
