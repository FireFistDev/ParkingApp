/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { Car } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../JWT/jwt-payload.interface";
@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCar(car: Car, user : JwtPayload ) {
    console.log(user)
    await this.prismaService.car.create({
      data: {
        ownerId: user.userId,
        carName: car.carName,
        type: car.type,
        serialNumber: car.serialNumber,
      },
    });
    return 'car created successfully'
  }
  deleteCar(car: Car) {
    return this.prismaService.car.delete({
      where: {
        id: car.id,
      },
    });
  }
  updateCar(car: Car) {
    return this.prismaService.car.update({where:{id: car.id}, data: {carName: car.carName} })

  }

  getCars(userId: number) {
    return this.prismaService.car.findMany({where:{ownerId : userId }});
  }
}
