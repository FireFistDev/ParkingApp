import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ParkingHistory, ParkingZone, currentParking } from "@prisma/client";
import { parkingErrors } from "../errors/expectedErrors";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ParkingEventService {
  private PaymentInterval = new Map<number, NodeJS.Timeout>();
  constructor(private readonly prismaService: PrismaService) {}

  async startParking(
    parkingData: { zoneId: number; carId: number },
    userId: number
  ): Promise<currentParking> {
    try {
      //  CHECKING IF  ZONE IS NOT UCCUPATED
      const zone = await this.prismaService.parkingZone.findUnique({
        where: { id: parkingData.zoneId },
        include: { currentParking: true },
      });

      if (zone.currentParking)
        throw new BadRequestException(parkingErrors.PARKING_ZONE_OCUPITED);
      // START PAYMENT IF NO PAYMENT TROWS ERROR
      if (
        !(await this.startPayment({
          userId,
          zone: zone,
          carId: parkingData.carId,
        }))
      )
        throw new UnauthorizedException(parkingErrors.PARKING_ZONE_OCUPITED);
      // IF EVERYTHGING IS FINE  START PARKING
      return await this.prismaService.currentParking.create({
        data: {
          zoneId: zone.id,
          carId: parkingData.carId,
          startTime: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async startPayment(data: {
    userId: number;
    zone: ParkingZone;
    carId: number;
  }): Promise<void | boolean> {
    try {
      // CHECK AND UPPDATE USER BALANSE
      if (
        !(await this.checkAndUpdateBalance({
          userId: data.userId,
          zone: data.zone,
        }))
      )
        return false;

      //  CREATE INTERVAL EVERY 1 HOUR TO MAKE PAYMENT
      const paymentInterval = setInterval(async () => {
        // IF PAYMENT NOT SUCCESED  PARKING END
        if (
          !(await this.checkAndUpdateBalance({
            userId: data.userId,
            zone: data.zone,
          }))
        )
          return this.endParking({ zoneId: data.zone.id, carId: data.carId });
      }, 1000 * 10);
      // SET INTERVAL FOR INDIVDUAL PARKING ZONE
      this.PaymentInterval.set(data.zone.id, paymentInterval);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async checkAndUpdateBalance(data: {
    userId: number;
    zone: ParkingZone;
  }) {
    //  cheking user before if have engought ballance
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId, balance: { gte: data.zone.pricePerHour } },
    });
    // Loging User Ballance
    console.log(user.balance);
    if (!user) return false;
    // checking User Balanse and if is engouht make decrement
    await this.prismaService.user.update({
      where: { id: data.userId },
      data: { balance: { decrement: data.zone.pricePerHour } },
    });
  }

  async endParking(data: {
    zoneId: number;
    carId: number;
  }): Promise<ParkingHistory> {
    try {
      // cheking and creating interval
      if (this.PaymentInterval.has(data.zoneId)) {
        clearInterval(this.PaymentInterval.get(data.zoneId));
      }
      // delete current parking
      const currentParking = await this.prismaService.currentParking.delete({
        where: { zoneId: data.zoneId, carId: data.carId },
      });

      // crete a parkking histroy model and return
      return await this.prismaService.parkingHistory.create({
        data: { ...currentParking, endTime: new Date() },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
