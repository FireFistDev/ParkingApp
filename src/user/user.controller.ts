import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto,LoginUserDto  } from "./userDtos/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  registerUser(@Body() user: CreateUserDto) {
    console.log(user)
    return this.userService.createUser(user);
  }

  @Post("login")
  loginUser(@Body() loginUser: LoginUserDto ) {
    return this.userService.findUser(loginUser);
  }

}
