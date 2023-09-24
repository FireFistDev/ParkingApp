import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtStrategy } from "../../JWT/jwt.strategy";

@Injectable()
export class ParkCarService {
  private intervalMap = new Map<number, NodeJS.Timeout>();
  constructor(
    private readonly prismaService: PrismaService
  ) // private readonly jwtStrategy: JwtStrategy
  {}
  async startParking(data: { zoneId: number; carId: number }) {
    await this.prismaService.currentParking.create({data:{zoneId: data.zoneId,carId: data.carId,startTime:'2023-09-25T14:30:00Z'}})
    this.processParkingSession(data.zoneId)
    console.log("parking session started")

  }
  async endParking(data: { zoneId: number; carId: number }) {
    clearInterval(this.intervalMap.get(data.zoneId));
    const currentParking = await this.prismaService.currentParking.delete({
      where: { zoneId: data.zoneId, carId: data.carId },
    });

    await this.prismaService.parkingHistory.create({
      data: {
        zoneId: data.zoneId,
        carId: data.carId,
        startTime: currentParking.startTime,
        endTime: "2023-09-25T14:30:00Z",
      },
    });
    return 'parking finished successfully'
  }
  private processParkingSession(parkingId: number): void {
    // Implement your logic here, e.g., deduct money, log the sessions, etc.
    console.log(`Processing parking session with ID ${parkingId}`);
    if (!this.intervalMap.has(parkingId)) {
      const intervalId = setInterval(() => {
        // Implement your logic here, e.g., deduct money, log the sessions, etc.
        console.log(`Processing parking session with ID ${parkingId}`);
      }, 10 * 1000); // 10 seconds interval

      this.intervalMap.set(parkingId, intervalId);
    }
  }

}
