import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  getByUsername(@Param('username') username: string): User {
    return this.userService.getByUsername(username);
  }

  @Post()
  create(@Body() user: User): User {
    return this.userService.create(user);
  }
}
