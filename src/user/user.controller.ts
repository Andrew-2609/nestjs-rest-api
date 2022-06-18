import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: User): User {
    return this.userService.createUser(user);
  }
}
