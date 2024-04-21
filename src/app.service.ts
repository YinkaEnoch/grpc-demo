import { Injectable } from '@nestjs/common';
import {
  UsersInterface,
  Users,
  AddUser,
  DeleteUser,
  UpdateUser,
} from './model/data';
import { CreateUserDto } from './createUsers.dto';
import { UpdateUserDto } from './updateUsers.dto';

@Injectable()
export class AppService {
  getAllUsers(): UsersInterface[] {
    return [...Users];
  }

  getUser(id: string): UsersInterface {
    return Users.filter((user) => user.id === id)[0];
  }

  addUser(createUserDto: CreateUserDto) {
    const id = Date.now().toString();

    // Check for existing records: email, username

    AddUser({ id, ...createUserDto });

    return { status: 'ok', message: 'New User added!' };
  }

  deleteUser(id: string) {
    DeleteUser(id);

    return { status: 'ok', message: 'User deleted' };
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    console.log({ id, updateUserDto });

    return UpdateUser(id, updateUserDto);
  }
}
