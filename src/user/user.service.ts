/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtStrategy } from "./JWT/jwt.strategy";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtStrategy: JwtStrategy
  ) {}

  async createUser(user: User) {
    const hashedPassword = await bcrypt.hash(
      user.password,
      10
    );
    const createdUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        userName: user.userName,
        password: hashedPassword,
      },
    });


    const token = await this.jwtStrategy.generateToken(createdUser); // Generate JWT token
    return { user: createdUser, token }; // Return user and token
  }


  
  async findUser(userCredintials: { email: string; password: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { email: userCredintials.email },
    });
    if (!user) {
      return null;
    }
    const confirmPassword = await bcrypt.compare(
      userCredintials.password,
      user.password
    );
    if (!confirmPassword) {
      return null;
    }
    const token = await this.jwtStrategy.generateToken(user); // Generate JWT token
    return { user, token }; // Return user and token
  }
}
