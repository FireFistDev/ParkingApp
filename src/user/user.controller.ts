import { Controller, Post, Body, Param, UseGuards, Req} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto,LoginUserDto  } from "./userDtos/user.dto";
import { JwtAuthGuard } from "src/guards/Auth.Guard";
import { request } from "express";
import { User } from "@prisma/client";
interface CustomRequest extends Request {
  user: User;
}

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

  @Post('passwordRecovery')
  requestpasswordRecovery(@Body() email: string ){
    return this.userService.requestPasswordRecovery(email);
  }
  @UseGuards(JwtAuthGuard)
  @Post('newPassword')
  requestNewPassword(@Req() req : CustomRequest ,@Body() body : {newPassword : string}) {
    const userId = req.user.id
return this.userService.setNewPassword({userId,newPassword : body.newPassword});
  }
}

