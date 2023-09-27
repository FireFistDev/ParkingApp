import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ParkingZoneService } from './parking-zone.service';
import { CreateParkingZoneDto } from './parkingZoneDtos/create-parking-zone.dto';
import { UpdateParkingZoneDto } from './parkingZoneDtos/update-parking-zone.dto';
import { ParkingZone, Adminisrator } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/Auth.Guard';
import { Request } from 'express'
interface CustomRequest extends Request {
  user: Adminisrator;
}
@Controller('parking-zone')
export class ParkingZoneController {
  constructor(private readonly parkingZoneService: ParkingZoneService) {}

//  creating a new zone with jwts autentification
  @UseGuards(JwtAuthGuard)
  @Post()
  creteZone(@Req() req : CustomRequest ):Promise<ParkingZone> {
    const creatorId =  req.user.id
    const parkingZone :CreateParkingZoneDto = req.body;
    return this.parkingZoneService.createZone(creatorId, parkingZone);
  }

//  geting all zone from admin
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllZone():Promise<ParkingZone[]> {
    return this.parkingZoneService.findAll();
  }
// GET INDIVIDUAL ZONE 
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneZone(@Param('id') id: string) : Promise<ParkingZone> {
    return this.parkingZoneService.findOne(+id);
  }
//  UPDATE INDIVIDUAL ZONE
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateZone(@Param('id') id: string, @Body() updateParkingZoneDto: UpdateParkingZoneDto): Promise<ParkingZone> {
    return this.parkingZoneService.update(+id, updateParkingZoneDto);
  }
//  DELETE INDIVIDUAL ZONE
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteZone(@Param('id') id: string): Promise<ParkingZone> {
    return this.parkingZoneService.remove(+id);
  }
}
