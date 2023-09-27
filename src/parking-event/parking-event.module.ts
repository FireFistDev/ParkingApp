import { Module } from '@nestjs/common';
import { ParkingEventService } from './parking-event.service';
import { ParkingEventController } from './parking-event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ParkingEventController],
  providers: [ParkingEventService],
})
export class ParkingEventModule {}
