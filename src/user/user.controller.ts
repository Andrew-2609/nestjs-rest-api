import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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
  create(@Body() user: User, @Res() res): void {
    const createdUser = this.userService.create(user);
    res
      .status(HttpStatus.CREATED)
      .location(`/users/${createdUser.username}`)
      .json(createdUser);
  }
}
