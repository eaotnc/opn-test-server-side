import { Injectable } from '@nestjs/common';
import { Profile } from 'src/auth/auth.interface';
import { v4 as uuid } from 'uuid';

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
    const userId: string = uuid();
    const newUserParam = { userId, ...newUser };
    this.users.push(newUserParam);
    console.log('🚀 ~ this.users:', this.users);

    return newUserParam;
  }

  async getProfile() {
    console.log('🚀 ~ this.users:', this.users);
    return this.users[0];
  }
}
