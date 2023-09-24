/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Get, Delete, Body, UseGuards,Req, Patch } from '@nestjs/common';
import { CarService } from './car.service';
import { Car  } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/Auth.Guard';
import { JwtPayload } from '../../JWT/jwt-payload.interface';
import { Request } from 'express'
import { UpdateCarDto } from './carDtos/car.dto';
interface CustomRequest extends Request {
  user: JwtPayload; // Assuming JwtPayload is a valid type/interface
}
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)

  createCar(@Req() req : CustomRequest) {
    const userPayload = req.user.userId
    const car= req.body;
    return this.carService.createCar(car, userPayload);
  }
  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteCar(@Body() carId: number):Promise<Car> {
    return this.carService.deleteCar(carId);
  }
  @Get('/getcars')
  @UseGuards(JwtAuthGuard)
  getUserCars(@Req() req : CustomRequest ): Promise<Car[]>{
    const userId = req.user.userId
    return this.carService.getCars(userId);
  }
  @Patch('update')
  @UseGuards(JwtAuthGuard)

  updateCar(@Body() car: UpdateCarDto)  :Promise<Car>  {
    return this.carService.updateCar(car);
  }
}

