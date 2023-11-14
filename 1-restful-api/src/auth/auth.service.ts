import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Profile } from './auth.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email, pass) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
    }
    if (bcrypt.compareSync(user?.password, pass)) {
      throw new HttpException('wrong email,password', HttpStatus.UNAUTHORIZED);
    }
    return {
      message: 'login success',
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
}
