import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ParkingHistory, ParkingZone, currentParking } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ParkingEventService {
  private PaymentInterval = new Map<number, NodeJS.Timeout>();
  constructor(private readonly prismaService: PrismaService) {}

  async startParking(data: {
    zoneId: number;
    carId: number;
    userId: number;
  }): Promise<currentParking> {
    try {
      const zone = await this.prismaService.parkingZone.findUnique({
        where: { id: data.zoneId },
        include: { currentParking: true },
      });
      if (zone.currentParking)
        throw new UnauthorizedException("zone is alredy ocupired");
      const user = await this.prismaService.user.findUnique({
        where: { id: data.userId, balance: { gte: zone.pricePerHour } },
      });

      if (!user)
        throw new UnauthorizedException("user have not enought balance");
      await this.startPayment({
        userId: user.id,
        zone: zone,
        carId: data.carId,
      });
      return await this.prismaService.currentParking.create({
        data: { zoneId: zone.id, carId: data.carId, startTime: new Date() },
      });
    } catch (error) {}
  }

  async startPayment(data: {
    userId: number;
    zone: ParkingZone;
    carId: number;
  }): Promise<void> {
    try {
      await this.prismaService.user.update({
        where: { id: data.userId },
        data: { balance: { decrement: data.zone.pricePerHour } },
      });
      const paymentInterval = setInterval(async () => {
        const user = await this.prismaService.user.findUnique({
          where: { id: data.userId, balance: { gte: data.zone.pricePerHour } },
        });
        if (!user)
          return this.endParking({ zoneId: data.zone.id, carId: data.carId });
        await this.prismaService.user.update({
          where: { id: data.userId },
          data: { balance: { decrement: data.zone.pricePerHour } },
        });
      }, 1000 * 10);
      this.PaymentInterval.set(data.zone.id, paymentInterval);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async endParking(data: {
    zoneId: number;
    carId: number;
  }): Promise<ParkingHistory> {
    try {
      if (this.PaymentInterval.has(data.zoneId)) {
        clearInterval(this.PaymentInterval.get(data.zoneId));
      }
      const currentParking = await this.prismaService.currentParking.delete({
        where: { zoneId: data.zoneId, carId: data.carId },
      });
      console.log(currentParking, "finished");
      return await this.prismaService.parkingHistory.create({
        data: { ...currentParking, endTime: new Date() },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
