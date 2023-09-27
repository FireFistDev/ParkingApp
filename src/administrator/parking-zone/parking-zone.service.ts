import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateParkingZoneDto } from "./parkingZoneDtos/create-parking-zone.dto";
import { UpdateParkingZoneDto } from "./parkingZoneDtos/update-parking-zone.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ParkingZone } from "@prisma/client";

@Injectable()
export class ParkingZoneService {
  constructor(private readonly prismaService: PrismaService) {}

  async createZone(
    creatorId: number,
    parkingZone: CreateParkingZoneDto
  ): Promise<ParkingZone> {
    try {
      return await this.prismaService.parkingZone.create({
        data: { ...parkingZone, creatorId },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  

  async findAll(): Promise<ParkingZone[]> {
    try {
      return await this.prismaService.parkingZone.findMany({
        include: {
          parkingHistories: true, // Include all parking histories
          currentParking: true, // Include the current parking
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<ParkingZone> {
    try {
      return await this.prismaService.parkingZone.findUnique({
        where: { id },
        include: {
          parkingHistories: true, // Include all parking histories
          currentParking: true, // Include the current parking
        },
      });
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }

  update(
    id: number,
    updateParkingZoneDto: UpdateParkingZoneDto
  ): Promise<ParkingZone> {
    try {
      return this.prismaService.parkingZone.update({
        where: { id },
        data: { ...updateParkingZoneDto},
      });
    } catch (error) {}
  }

  remove(id: number): Promise<ParkingZone> {
    try {
      return this.prismaService.parkingZone.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }
}
