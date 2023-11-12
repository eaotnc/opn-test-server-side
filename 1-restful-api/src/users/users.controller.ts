import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Profile } from 'src/auth/auth.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  userLists() {
    return this.userService.userLists();
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  updateUserById(@Body() updatedUserData: Partial<Profile>) {
    return this.userService.updateUserById(updatedUserData);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  getProfile(@Param() params: any) {
    return this.userService.getProfile(params.userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':userId')
  deleteUser(@Param() params: any) {
    return this.userService.deleteUser(params.userId);
  }
}
