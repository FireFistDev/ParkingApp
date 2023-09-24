import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ParkingZoneService } from './parking-zone.service';
import { CreateParkingZoneDto } from './parkingZoneDtos/create-parking-zone.dto';
import { UpdateParkingZoneDto } from './parkingZoneDtos/update-parking-zone.dto';
import { ParkingZone, adminisrator } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/Auth.Guard';
import { Request } from 'express'
interface CustomRequest extends Request {
  user: adminisrator; // Assuming JwtPayload is a valid type/interface
}
@Controller('parking-zone')
export class ParkingZoneController {
  constructor(private readonly parkingZoneService: ParkingZoneService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create-parking-zone')
  creteZone(@Req() req : CustomRequest ):Promise<ParkingZone> {
    const creatorId =  req.user.id
    const parkingZone = req.body;
    return this.parkingZoneService.createZone(creatorId, parkingZone);
  }
  @UseGuards(JwtAuthGuard)
  @Get('get-all-zone')
  findAllZone():Promise<ParkingZone[]> {
    return this.parkingZoneService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneZone(@Param('id') id: string) : Promise<ParkingZone> {
    return this.parkingZoneService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateZone(@Param('id') id: string, @Body() updateParkingZoneDto: UpdateParkingZoneDto): Promise<ParkingZone> {
    return this.parkingZoneService.update(+id, updateParkingZoneDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteZone(@Param('id') id: string): Promise<ParkingZone> {
    return this.parkingZoneService.remove(+id);
  }
}
