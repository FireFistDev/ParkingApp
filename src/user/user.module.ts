import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarModule } from './car/car.module';
import { JwtStrategy } from '../JWT/jwt.strategy';
@Module({
  imports: [PrismaModule, CarModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
