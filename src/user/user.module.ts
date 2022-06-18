import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from './is-unique-validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, IsUniqueConstraint],
})
export class UserModule {}
