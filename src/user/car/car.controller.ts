/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Get, Delete, Body, UseGuards,Req, Patch } from '@nestjs/common';
import { CarService } from './car.service';
import { Car  } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/Auth.Guard';
import { JwtPayload } from '../../JWT/jwt-payload.interface';
import { Request } from 'express'
import { CreateCarDto, UpdateCarDto } from './carDtos/car.dto';
export interface CustomRequestCar extends Request {
  user: JwtPayload; // Assuming JwtPayload is a valid type/interface
}
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createCar(@Req() req : CustomRequestCar) :Promise<Car> {
    const userId : number = req.user.userId
    const car : CreateCarDto= req.body;
    return this.carService.createCar(car, userId);
  }
  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteCar(@Body() carId: number):Promise<Car> {
    return this.carService.deleteCar(carId);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserCars(@Req() req : CustomRequestCar ): Promise<Car[]>{
    const userId = req.user.userId
    return this.carService.getCars(userId);
  }
  @Patch()
  @UseGuards(JwtAuthGuard)
  updateCar(@Body() car: UpdateCarDto)  :Promise<Car>  {
    return this.carService.updateCar(car);
  }
}

