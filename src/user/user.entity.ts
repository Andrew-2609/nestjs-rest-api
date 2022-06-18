import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: number;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsEmail({}, { message: 'You must provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Fullname is required' })
  fullname: string;

  signupDate: Date;
}
