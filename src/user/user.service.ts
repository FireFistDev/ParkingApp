/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User) {
    const hashedPassword = await bcrypt.hash(
      user.password,
      process.env.BCRYPT_SALT,
    );
    const createdUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        userName: user.userName,
        password: hashedPassword,
      },
    });
    return createdUser;
  }
  async findUser(userCredintials: { email: string; password: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { email: userCredintials.email },
    });
    if (!user) {
      return null;
    }
    const confirmPassword = await bcrypt.compare(
      user.password,
      userCredintials.password,
    );
    if (!confirmPassword) {
      return null;
    }
    return user;
  }
}
