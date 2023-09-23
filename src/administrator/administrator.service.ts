import { Injectable } from "@nestjs/common";
import { ParkingZone } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdministratorService {
  constructor(private readonly prismaService: PrismaService) {}

  async createZone(zone: ParkingZone) {
    await this.prismaService.parkingZone.create({
      data: {
        zoneName: zone.zoneName,
        zoneAddress: zone.zoneAddress,
        pricePerHour: zone.pricePerHour,
      },
    });

    return "zone created Successfully";
  }

  async getAllZones() {
    const zones = await this.prismaService.parkingZone.findMany();
    return zones;
  }

  async getSingleZone(zoneId: number) {
    const zones = await this.prismaService.parkingZone.findUnique({
      where: { id: zoneId },
    });
    return zones;
  }

  async updateZone(zone: ParkingZone) {
    const zones = await this.prismaService.parkingZone.update({
      where: { id: zone.id },
      data: { zoneName: zone.zoneName },
    });
    return zones;
  }

  async deleteZone(zoneId: number) {
    return this.prismaService.parkingZone.delete({ where: { id: zoneId } });
  }
}
