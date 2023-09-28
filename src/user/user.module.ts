import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarModule } from './car/car.module';
import { JwtStrategy } from '../JWT/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [CarModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy,PrismaService],
  exports: [UserService]
})
export class UserModule {}

