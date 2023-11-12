import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Profile } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {
      access_token: 'Bearer faketoken_user1',
    };
  }

  async register(param: Profile) {
    try {
      const response = await this.usersService.createUser(param);
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this.usersService.getProfile(userId);
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
      await this.usersService.deleteUserById(userId);
      return `delete userID: ${userId} success`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
