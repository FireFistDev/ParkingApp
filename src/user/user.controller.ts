import { Controller, Post, Body, Param, UseGuards, Req} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto,LoginUserDto  } from "./userDtos/user.dto";
import { JwtAuthGuard } from "../guards/Auth.Guard";
import { User } from "@prisma/client";
export interface CustomRequest extends Request {
  user: User;
}

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  registerUser(@Body() user: CreateUserDto) : Promise<string> {
    return this.userService.createUser(user);
  }

  @Post("login")
  loginUser(@Body() loginUser: LoginUserDto ) : Promise<string>  {
    return this.userService.findUser(loginUser);
  }

  @Post('passwordRecovery')
  requestPasswordRecovery(@Body() Body : { email: string} ) : Promise<string> {
    return this.userService.requestPasswordRecovery(Body.email);
  }
  @UseGuards(JwtAuthGuard)
  @Post('newPassword')
  requestNewPassword(@Req() req : CustomRequest ,@Body() body : {newPassword : string}):Promise<string>  {
    const userId = req.user.id
    return this.userService.setNewPassword({userId, newPassword : body.newPassword});
  }
}

