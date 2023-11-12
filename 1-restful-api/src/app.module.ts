import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AuthController, UsersController],
  providers: [AppService, AuthService],
})
export class AppModule {}
