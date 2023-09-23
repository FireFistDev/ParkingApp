import { Body, Controller,Post } from '@nestjs/common';
import { ParkCarService } from './park-car.service';

@Controller('park-car')
export class ParkCarController {
  constructor(private readonly parkCarService: ParkCarService) {}

  @Post('/start-parking')
  startParking(@Body() data : { zoneId: number, carId: number}){
     
    return this.parkCarService.startParking(data);
  }
  @Post('/stop-parking')
  finishedParking(@Body() data : { zoneId: number, carId: number}){
    return this.parkCarService.endParking(data);
  }
}
