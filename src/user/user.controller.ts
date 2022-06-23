import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  getByUsername(@Param('username') username: string): User {
    const foundUser = this.userService.getByUsername(username);

    if (!foundUser)
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User '${username}' not found.`,
      });

    return foundUser;
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
