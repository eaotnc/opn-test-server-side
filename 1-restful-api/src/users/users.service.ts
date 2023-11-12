import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async userLists() {
    return this.users;
  }

  async createUser(newUser: Profile) {
    const userId: string = uuid();
    const newUserParam = { userId, ...newUser };
    this.users.push(newUserParam);
    return newUserParam;
  }

  async getProfile(userId: string) {
    try {
      const user = this.users.find((user) => user.userId === userId);
      if (user) {
        return user;
      } else {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(userId: string) {
    try {
      const index = this.users.findIndex((user) => user.userId === userId);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
      return `delete userID: ${userId} success`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
