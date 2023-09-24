import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarModule } from './car/car.module';
import { JwtStrategy } from '../JWT/jwt.strategy';
import { ParkCarModule } from './park-car/park-car.module';

@Module({
  imports: [PrismaModule, CarModule, ParkCarModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
