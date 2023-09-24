import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParkingZoneModule } from './parking-zone/parking-zone.module';
import { JwtStrategy } from 'src/JWT/jwt.strategy';
@Module({
  imports: [PrismaModule, ParkingZoneModule],
  controllers: [AdministratorController],
  providers: [AdministratorService, JwtStrategy],
})
export class AdministratorModule {}
