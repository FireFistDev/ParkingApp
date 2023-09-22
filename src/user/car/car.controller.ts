/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Get, Delete, Body, UseGuards,Req, Patch } from '@nestjs/common';
import { CarService } from './car.service';
import { Car, User } from '@prisma/client';
import { JwtAuthGuard } from '../guards/Auth.Guard';
import { JwtPayload } from '../JWT/jwt-payload.interface';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createCar(@Req() req ) {
    const userPayload : JwtPayload= req.user
    const car: Car = req.body;
    return this.carService.createCar(car, userPayload);
  }
  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteCar(@Body() car: Car) {
    return this.carService.deleteCar(car);
  }
  @Get('/getcars')
  @UseGuards(JwtAuthGuard)
  getUserCars(@Req() req ) {
    const userId = req.user.userId
    return this.carService.getCars(userId);
  }
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateCar(@Body() car: Car) {
    return this.carService.updateCar(car);
  }
}

