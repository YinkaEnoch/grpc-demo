import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersInterface } from './model/data';
import { CreateUserDto } from './createUsers.dto';
import { UpdateUserDto } from './updateUsers.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): UsersInterface[] {
    return this.appService.getAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): UsersInterface {
    const response: UsersInterface = this.appService.getUser(id);

    if (!response) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return response;
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.addUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const response = this.appService.updateUser(id, updateUserDto);

    if (!response) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return { status: 'ok', message: 'User updated' };
  }

  @GrpcMethod('UserService', 'getUsers')
  getUsers() {
    return {
      users: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' },
      ],
    };
  }
}

/***
 * TODO:
 * - Fetch all users
 * - fetch a single user
 * - Add a new user
 * - Delete a user
 * - update a user
 */

/***
 * HTTP Verbs:
 * - GET
 * - POST
 * - PUT
 * - PATCH
 * - DELETE
 */
