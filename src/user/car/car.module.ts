import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../../JWT/jwt.strategy';

@Module({

  imports: [PrismaModule],
  controllers: [CarController],
  providers: [CarService, JwtStrategy],
})
export class CarModule {}
