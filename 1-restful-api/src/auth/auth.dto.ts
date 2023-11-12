import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  subscribeToNewsletter: boolean;
}

export class LoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  newPassword: string;
  @IsNotEmpty()
  oldPassword: string;
}
