import { Module } from '@nestjs/common';
import { ParkCarService } from './park-car.service';
import { ParkCarController } from './park-car.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ParkCarController],
  providers: [ParkCarService],
})
export class ParkCarModule {}

