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
    return newUserParam;
  }

  async getProfile(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }

  async deleteUserById(userId: string): Promise<void> {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
