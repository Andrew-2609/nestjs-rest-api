import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'ndrewcoding',
      email: 'andrew@email.com',
      password: '123456_hack_me',
      fullname: 'Andrew',
      signupDate: new Date(),
    },
  ];

  public getByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }

  public create(user: User): User {
    this.users.push(user);
    return user;
  }
}
