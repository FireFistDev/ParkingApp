import {  Module } from '@nestjs/common';
import { ParkingZoneService } from './parking-zone.service';
import { ParkingZoneController } from './parking-zone.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports:[PrismaModule],
  controllers: [ParkingZoneController],
  providers: [ParkingZoneService, ],
})
export class ParkingZoneModule {
}
