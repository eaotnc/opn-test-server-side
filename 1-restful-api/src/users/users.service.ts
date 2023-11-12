import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangePassword, Profile } from 'src/auth/auth.interface';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  users: Array<Profile>;
  constructor() {
    this.users = [];
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
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
        const userWithoutPassword = _.omit(user, 'password');
        return userWithoutPassword;
      } else {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  updateUserById(updatedUserData: Partial<Profile>): Partial<Profile> {
    const userIndex = this.users.findIndex(
      (user) => user.userId === updatedUserData.userId,
    );
    if (userIndex === -1) {
      throw new NotFoundException(
        `User with ID ${updatedUserData.userId} not found`,
      );
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updatedUserData };
    const user = this.users[userIndex];
    const userWithoutPassword = _.omit(user, 'password');
    return userWithoutPassword;
  }

  private async validatePassword(
    user: Profile,
    oldPassword: string,
  ): Promise<void> {
    // const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (oldPassword !== user.password) {
      throw new UnauthorizedException('Invalid old password');
    }
  }

  async changePassword(body: ChangePassword): Promise<string> {
    const { userId, oldPassword, newPassword } = body;
    const userIndex = this.users.findIndex((user) => user.userId === userId);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const user = this.users[userIndex];
    await this.validatePassword(user, oldPassword);
    // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;

    return 'password has changed';
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
