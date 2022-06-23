import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
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
  create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/users/${createdUser.username}` })
      .withBody(createdUser)
      .build();
  }
}
