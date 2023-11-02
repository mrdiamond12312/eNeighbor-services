import { Match } from '@modules/auth/decorators/match.decorators';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  userNameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterAuthDto implements Omit<AuthDto, 'userNameOrEmail'> {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;
}
