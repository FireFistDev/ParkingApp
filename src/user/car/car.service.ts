/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCarDto, UpdateCarDto } from "./carDtos/car.dto";
import { Car } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class CarService {
  
  constructor(private readonly prismaService: PrismaService) {}

  async createCar(car: CreateCarDto, ownerId: number): Promise<Car> {
    try {
      return await this.prismaService.car.create({
        data: {
          ownerId,
          carName: car.carName,
          type: car.type,
          serialNumber: car.serialNumber,
        },
      });
    } catch (error) {
      throw new BadRequestException({message: 'creteCar does not created', error: error});
    }
  }
  deleteCar(id: number): Promise<Car> {
    try {
      return this.prismaService.car.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException("car does not deleted", error);
    }
  }
  updateCar(car: UpdateCarDto): Promise<Car> {
    try {
      return this.prismaService.car.update({
        where: { id: car.id },
        data: { carName: car.carName },
      });
    } catch (error) {
      throw new BadRequestException("car does not update successfully", error);
    }
  }

  getCars(userId: number): Promise<Car[]> {
    try {
      return this.prismaService.car.findMany({ where: { ownerId: userId } });
    } catch (error) {
      throw new BadRequestException("cars can not be found", error);
    }
  }
}
