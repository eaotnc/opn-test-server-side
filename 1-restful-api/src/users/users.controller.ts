import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  userLists() {
    return this.userService.userLists();
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
