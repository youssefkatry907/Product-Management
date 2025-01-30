import { 
  IsEmail, 
  IsString, 
  IsNotEmpty, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsEnum 
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export class AuthRequestDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value))
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either "user" or "admin"' })
  @IsString({ message: 'Role must be a string' })
  role?: UserRole = UserRole.USER;
}