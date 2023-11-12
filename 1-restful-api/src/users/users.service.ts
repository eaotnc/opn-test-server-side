import { Injectable } from '@nestjs/common';
import { Profile } from 'src/auth/auth.interface';

@Injectable()
export class UsersService {
  users: Array<Profile>;
  constructor() {
    this.users = [];
  }

  async findOne(username) {
    return this.users.find((user) => user.name === username);
  }
  async createUser(newUser: Profile) {
    this.users.push(newUser);
    console.log(this.users);
    return newUser;
  }
}
