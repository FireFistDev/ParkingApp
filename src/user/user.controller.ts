import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Post('login')
  loginUser(@Body() userCredintials: User) {
    return this.userService.findUser(userCredintials);
  }
}
