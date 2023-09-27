/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtStrategy } from "../JWT/jwt.strategy";
import { CreateUserDto, LoginUserDto  } from "./userDtos/user.dto";
import { User } from "@prisma/client";
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtStrategy: JwtStrategy
  ) {}

  async createUser(user: CreateUserDto): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.prismaService.user.create({
        data: {
          email: user.email,
          userName: user.userName,
          password: hashedPassword,
        },
      });
      return await this.jwtStrategy.generateToken(createdUser); // Generate JWT token
    } catch (error) {
      throw new BadRequestException({error});
    }
  }

  async findUser(loginUser: LoginUserDto ): Promise<string> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: loginUser.email },
      });
      if (!user) {
        throw new UnauthorizedException({messge : "wrong credintials"});
      }
      const confirmPassword = await bcrypt.compare(
        loginUser.password,
        user.password
      );
      if (!confirmPassword) {
        throw new UnauthorizedException({messge : "wrong credintials"});
      }
      // Generate JWT token
      return await this.jwtStrategy.generateToken(user);
    } catch (error) {
      throw new BadRequestException({error});
    }
  }

  async requestPasswordRecovery(email : string){
    try {

      const user = await this.prismaService.user.findUnique({where:{email:email}})
      if(!user) throw new UnauthorizedException({messge : "user not found"});
      const token  = this.jwtStrategy.generateToken(user)
      this.sendMail()
      return token
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  sendMail(){

  }

  async setNewPassword(data:{userId : number,newPassword: string}){
    try {
      const hashedPassword = await bcrypt.hash(data.newPassword, 10);
      return await this.prismaService.user.update({where: {id: data.userId},data: {password: hashedPassword}})
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
