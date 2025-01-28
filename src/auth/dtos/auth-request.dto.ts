import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AuthRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  role?: string; // Optional, default to 'user'
}