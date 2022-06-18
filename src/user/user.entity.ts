import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from './is-unique-validator';

export class User {
  id: number;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @IsUnique({ message: 'Username is already taken' })
  username: string;

  @IsEmail({}, { message: 'You must provide a valid email' })
  @IsUnique({ message: 'Email is already in use' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Fullname is required' })
  fullname: string;

  signupDate: Date;
}
