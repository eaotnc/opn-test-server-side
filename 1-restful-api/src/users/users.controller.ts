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
  @Put('profile/:userId')
  updateUserById(
    @Param('userId') userId: string,
    @Body() updatedUserData: Partial<Profile>,
  ) {
    const updateUserParam = { userId, ...updatedUserData };
    return this.userService.updateUserById(updateUserParam);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.userService.getProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
