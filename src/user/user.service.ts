/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtStrategy } from "../JWT/jwt.strategy";
import { CreateUserDto, LoginUserDto } from "./userDtos/user.dto";
import { userErrors } from "../errors/expectedErrors";
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtStrategy: JwtStrategy
  ) {}

  async createUser(user: CreateUserDto): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, +process.env.BCRYPT_SALT); // hashing password to save database
      const createdUser = await this.prismaService.user.create({
        data: {
          email: user.email,
          userName: user.userName,
          password: hashedPassword,
        },
      });
      return await this.jwtStrategy.generateToken(createdUser); // Generate JWT token
    } catch (error) {
      throw new BadRequestException({
        message: userErrors.USER_NOT_CREATE,
        error: error.message,
      });
    }
  }

  async findUser(loginUser: LoginUserDto): Promise<string> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: loginUser.email },
      });
      if (!user) {
        throw new UnauthorizedException(userErrors.USER_NOT_FOUND)
      }
      const confirmPassword = await bcrypt.compare(
        loginUser.password,
        user.password
      );
      if (!confirmPassword) {
        throw new UnauthorizedException(userErrors.WRONG_PASSWORD);
      }
      // Generate JWT token
      return await this.jwtStrategy.generateToken(user);
    } catch (error) {
      throw new BadRequestException({
        error: error.message
      });
    }
  }

  async requestPasswordRecovery(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: email },
      });
      if (!user)
        throw new UnauthorizedException({ message: userErrors.USER_NOT_FOUND });
      const token = this.jwtStrategy.generateToken(user);
      return token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async setNewPassword(data: { userId: number; newPassword: string }) {
    try {
      const hashedPassword = await bcrypt.hash(data.newPassword, 10);
      const user =  await this.prismaService.user.update({
        where: { id: data.userId },
        data: { password: hashedPassword },
      });
      return   this.jwtStrategy.generateToken(user);
    } catch (error) {
      throw new BadRequestException({
        message: userErrors.SOMETHING_WRONG,
        error: error.message,
      });
    }
  }
}
